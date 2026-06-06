# Angular + NodeJS + MongoDB PoC

This repository contains an insurance portal proof-of-concept with:
- `frontend` — Angular app using PrimeNG for UI
- `backend` — Node.js + Express API with JWT authentication

## Setup

### Backend
1. Install dependencies and start backend:
```bash
cd backend
npm install
npm start
```

The backend runs on port `4000` and exposes:
- `POST /api/auth/login` — body `{ username, password }` returns `{ token }` (admin: `admin` / `admin123`)
- `GET /api/policies` — public list of policies
- `POST /api/policies` — create (requires `Authorization: Bearer <token>`)
- `PUT /api/policies/:id` — update (requires token)
- `DELETE /api/policies/:id` — delete (requires token)

### Frontend
1. Install dependencies and start frontend:
```bash
cd frontend
npm install
npm start
```

The frontend runs on port `4200` and provides:
- Public home page with policy cards and `Admin Login` button
- Admin login uses JWT and shows a left sidebar dashboard with edit/add/delete capabilities

## Notes
Please run backend first, then frontend. After successful login (admin/admin123) you'll be able to add/edit/delete policies from the UI.
