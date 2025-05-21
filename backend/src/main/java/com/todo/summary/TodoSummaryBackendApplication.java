package com.todo.summary;
//use these when deploying locally on your system
//import io.github.cdimascio.dotenv.Dotenv;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoSummaryBackendApplication {

	public static void main(String[] args) {
		// ✅ Load environment variables from .env
		Dotenv dotenv = Dotenv.load();
		System.setProperty("OPENAI_API_KEY", dotenv.get("OPENAI_API_KEY"));
		System.setProperty("SLACK_WEBHOOK_URL", dotenv.get("SLACK_WEBHOOK_URL"));

		SpringApplication.run(TodoSummaryBackendApplication.class, args);
	}
}
