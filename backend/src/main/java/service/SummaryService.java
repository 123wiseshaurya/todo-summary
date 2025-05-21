package com.todo.summary.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.summary.model.Todo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SummaryService {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    @Value("${slack.webhook.url}")
    private String slackWebhookUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String summarizeTodos(List<Todo> todos) {
        String prompt = "Summarize the following todo items:\n" +
                todos.stream()
                        .filter(todo -> !todo.isCompleted())
                        .map(Todo::getTitle)
                        .collect(Collectors.joining("\n"));

        // Prepare OpenAI request
        Map<String, Object> message1 = Map.of("role", "system", "content", "You are a helpful assistant.");
        Map<String, Object> message2 = Map.of("role", "user", "content", prompt);

        Map<String, Object> requestBodyMap = new HashMap<>();
        requestBodyMap.put("model", "gpt-3.5-turbo");
        requestBodyMap.put("messages", List.of(message1, message2));

        String requestBody;
        try {
            requestBody = objectMapper.writeValueAsString(requestBodyMap);
        } catch (Exception e) {
            return "Error building OpenAI request: " + e.getMessage();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        String openaiUrl = "https://api.openai.com/v1/chat/completions";

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(openaiUrl, request, String.class);
            return extractContentFromOpenAiResponse(response.getBody());
        } catch (Exception e) {
            return "Error generating summary: " + e.getMessage();
        }
    }

    public boolean sendToSlack(String summary) {
        Map<String, String> payload = Map.of("text", summary);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

        try {
            restTemplate.postForEntity(slackWebhookUrl, request, String.class);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private String extractContentFromOpenAiResponse(String responseBody) {
        // This is a naive approach — ideally use objectMapper.readTree()
        try {
            Map<?, ?> json = objectMapper.readValue(responseBody, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) json.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                return message.get("content").toString();
            }
        } catch (Exception e) {
            return "Failed to parse OpenAI response.";
        }
        return "No content found.";
    }
}
