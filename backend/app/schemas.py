from pydantic import BaseModel, ConfigDict
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
    model_config = ConfigDict(from_attributes=True)


class StudentCreate(UserBase):
    password: str
    grade_level: Optional[str] = None
    department: Optional[str] = None

class StudentBase(BaseModel):
    student_id: str
    grade_level: Optional[str] = None
    department: Optional[str] = None

class Student(StudentBase):
    id: int
    user: User
    model_config = ConfigDict(from_attributes=True)


class StudentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    grade_level: Optional[str] = None
    department: Optional[str] = None
    is_active: Optional[bool] = None

class AttendanceBase(BaseModel):
    student_id: int
    date: date
    status: str
    subject: str

class Attendance(AttendanceBase):
    id: int
    teacher_id: int
    model_config = ConfigDict(from_attributes=True)

class GradeBase(BaseModel):
    subject: str
    grade: float
    assignment_type: str

class GradeCreate(GradeBase):
    student_id: int

class Grade(GradeBase):
    id: int
    student_id: int
    model_config = ConfigDict(from_attributes=True)
