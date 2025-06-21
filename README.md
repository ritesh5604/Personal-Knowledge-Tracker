# 📚 Knowledge Tracker

A full-stack MERN-style app to track and manage technical concepts — add, view, edit, and delete concepts using a clean UI. Built using React (Vite) + Express + MongoDB.

---

## 🚀 Features

- 📌 Add new concepts with title, description, and tags
- 🗃️ View all added concepts
- ✏️ Edit and delete existing concepts
- 💾 Persistent storage using MongoDB
- 💡 Professional file structure and modular design

---

## 🏗️ Project Structure

```
knowledge-tracker/
├── client/
│   └── frontend/          # Vite-powered React frontend
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ConceptForm.jsx
│       │   │   └── ConceptsList.jsx
│       │   └── App.jsx
│       ├── index.html
│       ├── vite.config.js
│       └── package.json
│
├── server/                # Node.js + Express backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Entry point
│   └── package.json
│
├── mongo-data/            # MongoDB seed or dump data
├── .env                   # Environment variables

```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/knowledge-tracker.git
cd knowledge-tracker
```

---

### 2. Backend Setup (`server/`)

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/knowledge-tracker
```

Start the server:

```bash
npm run dev
```

> Your backend will be running at `http://localhost:5000`

---

### 3. Frontend Setup (`client/frontend/`)

```bash
cd client/frontend
npm install
npm run dev
```

> The React app will run at `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| GET    | `/api/concepts`    | Fetch all concepts      |
| POST   | `/api/concepts`    | Add a new concept       |
| PUT    | `/api/concepts/:id`| Update an existing one  |
| DELETE | `/api/concepts/:id`| Delete a concept        |

---

## 💡 Sample Concept Payload

```json
{
  "title": "Node.js Streams",
  "description": "Streams are a powerful way to handle data reading/writing.",
  "tags": ["node", "backend", "streams"]
}
```

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) or the frontend UI to test adding/editing/deleting concepts.

---

## 📂 Mongo Data

`mongo-data/` folder is used to store seed or export files. You can import data using:

```bash
mongorestore --db knowledge-tracker ./mongo-data
```

---

## 📝 License

MIT License

---

## 👨‍💻 Author

Built with ❤️ by Ritesh Pandey(https://github.com/ritesh5604)
