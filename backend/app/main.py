from fastapi import FastAPI #import API framework
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .routers import auth, attendance, students, teachers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(attendance.router, prefix="/api/attendance", tags=["attendance"])
app.include_router(students.router, prefix="/api/students", tags=["students"])
app.include_router(teachers.router, prefix="/api/teachers", tags=["teachers"])
