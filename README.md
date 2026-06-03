# Angular + NodeJS + MongoDB PoC

This repository contains a small proof-of-concept full-stack application:
- `frontend` — Angular app
- `backend` — Node.js + Express API
- MongoDB — data persistence via Mongoose

## Setup

### Backend
1. Install dependencies:
```bash
cd backend
npm install
```
2. Configure MongoDB connection:
- Copy `.env.example` to `.env`
- Set `MONGODB_URI`

3. Start backend:
```bash
npm start
```

### Frontend
1. Install dependencies:
```bash
cd frontend
npm install
```
2. Start frontend:
```bash
npm start
```

## Notes
- Backend runs on port `4000`
- Frontend runs on port `4200`
- The Angular app fetches todos from the backend API at `/api/todos`
