from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    # Represents the user of the system (could be a student or teacher)

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="student")
    name = Column(String)
    is_active = Column(Boolean, default=True)

    student = relationship("Student", back_populates="user", uselist=False)
    teacher = relationship("Teacher", back_populates="user", uselist=False)

class Student(Base):
    __tablename__ = "students"
    # Represents a student enrolled in the system

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    student_id = Column(String, unique=True, index=True)
    grade_level = Column(String)
    department = Column(String)

    user = relationship("User", back_populates="student")
    attendance = relationship("Attendance", back_populates="student")
    grades = relationship("Grade", back_populates="student")

class Teacher(Base):
    __tablename__ = "teachers"
    # Represents a teacher in the system

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    teacher_id = Column(String, unique=True, index=True)
    department = Column(String)

    user = relationship("User", back_populates="teacher")
    attendance = relationship("Attendance", back_populates="teacher")

class Attendance(Base):
    __tablename__ = "attendance"
    # Represents the attendance record for a student in a class

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    teacher_id = Column(Integer, ForeignKey("teachers.id"))
    date = Column(Date)
    status = Column(String)
    subject = Column(String)

    student = relationship("Student", back_populates="attendance")
    teacher = relationship("Teacher", back_populates="attendance")

class Grade(Base):
    __tablename__ = "grades"
    # Represents a student's grade for a specific assignment or subject

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    subject = Column(String)
    grade = Column(Float)
    assignment_type = Column(String)

    student = relationship("Student", back_populates="grades")
