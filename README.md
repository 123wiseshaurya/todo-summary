## 🌐 DEMO CLIP
https://drive.google.com/file/d/1fF9f89aUNphKKTmeTpTgiwhWrtNG7PqA/view?usp=drivesdk


# 📝 Todo Summary Assistant

A full-stack application that lets users manage to-dos, summarize pending items using OpenAI, and post the summary to a Slack channel.

---

## 📦 Tech Stack

* **Frontend**: React
* **Backend**: Java (Spring Boot)
* **Database**: PostgreSQL (hosted via Supabase)
* **LLM Integration**: OpenAI API
* **Notifications**: Slack Webhook

---

## 🚀 Features

* Add, edit, and delete to-do items
* View pending and completed to-dos
* Generate a summary using OpenAI
* Automatically post summary to Slack
* Toast messages for Slack success/failure

---

## 📁 Monorepo Structure

```
todo-summary/
├── backend/          # Spring Boot backend
└── frontend/         # React frontend
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/123wiseshaurya/todo-summary.git
cd todo-summary
```

---

### 2. Backend Setup

#### 🔪 Prerequisites

* Java 17+
* Maven
* PostgreSQL (or Supabase)

#### ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```env
OPENAI_API_KEY=your-openai-key
SLACK_WEBHOOK_URL=your-slack-webhook-url
```

Also configure `application.properties`:

```
spring.datasource.url=jdbc:postgresql://<host>:5432/<db>
spring.datasource.username=postgres
spring.datasource.password=your-password
```

#### ▶️ Run the backend

```bash
cd backend
./mvnw spring-boot:run
```

---

### 3. Frontend Setup

#### ⚙️ Environment Variables

Create a `.env` in `frontend/`:

```env
REACT_APP_API_URL=http://localhost:8080
```

#### ▶️ Run the frontend

```bash
cd frontend
npm install
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔗 Slack Webhook Setup

1. Go to [https://api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)
2. Create a new webhook for your Slack channel
3. Copy the webhook URL and paste it in `backend/.env`

---

## 🧠 LLM Integration (OpenAI)

1. Go to [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
2. Create an API key
3. Add it to `backend/.env`

---

## 📄 License

MIT – feel free to use and modify this project.
