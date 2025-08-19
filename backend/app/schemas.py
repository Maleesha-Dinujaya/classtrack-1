from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

class UserBase(BaseModel):
    email: str
    name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: str

class User(UserBase):
    id: int
    role: str
    is_active: bool

    class Config:
        orm_mode = True

class StudentBase(BaseModel):
    student_id: str
    grade_level: Optional[str] = None
    department: Optional[str] = None

class Student(StudentBase):
    id: int
    user: User

    class Config:
        orm_mode = True

class AttendanceBase(BaseModel):
    student_id: int
    date: date
    status: str
    subject: str

class Attendance(AttendanceBase):
    id: int

    class Config:
        orm_mode = True

class GradeBase(BaseModel):
    subject: str
    grade: float
    assignment_type: str

class Grade(GradeBase):
    id: int

    class Config:
        orm_mode = True
