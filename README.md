# ClassTrack

This repository contains the frontend and backend for ClassTrack.

- `frontend/` – Next.js application
- `backend/` – FastAPI application

## Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # adjust values as needed
uvicorn app.main:app --reload
```

## Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
