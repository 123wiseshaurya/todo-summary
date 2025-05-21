package com.todo.summary.controller;

import com.todo.summary.model.Todo;
import com.todo.summary.repository.TodoRepository;
import com.todo.summary.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/summarize")
@CrossOrigin(origins = "*")
public class SummaryController {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private SummaryService summaryService;

    @PostMapping
    public Map<String, Object> summarizeAndSend() {
        List<Todo> todos = todoRepository.findAll();
        String summary = summaryService.summarizeTodos(todos);
        boolean slackSuccess = summaryService.sendToSlack(summary);

        return Map.of(
                "summary", summary,
                "slackPosted", slackSuccess
        );
    }
}
