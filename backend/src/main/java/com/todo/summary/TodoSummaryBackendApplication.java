package com.todo.summary;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoSummaryBackendApplication {

    public static void main(String[] args) {
        // ✅ Load .env only if not running on a cloud platform
        if (System.getenv("RAILWAY_ENVIRONMENT") == null && System.getenv("RENDER") == null) {
            try {
                Dotenv dotenv = Dotenv.load();
                System.setProperty("OPENAI_API_KEY", dotenv.get("OPENAI_API_KEY"));
                System.setProperty("SLACK_WEBHOOK_URL", dotenv.get("SLACK_WEBHOOK_URL"));
            } catch (Exception e) {
                System.err.println("⚠️ Warning: .env not found or failed to load. Using system environment variables.");
            }
        }

        SpringApplication.run(TodoSummaryBackendApplication.class, args);
    }
}
