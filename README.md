# ClassTrack

This repository contains the frontend and backend for ClassTrack.

- `frontend/` – Next.js application
- `backend/` – FastAPI application

## Docker setup

To run the entire project with Docker, build and start the containers using:

```bash
docker compose up --build
```

The backend will be available at [http://localhost:8000](http://localhost:8000) and the frontend at [http://localhost:3000](http://localhost:3000).

##   Backend   setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Frontend   setup

```bash  
cd frontend
npm install
npm run dev
```
