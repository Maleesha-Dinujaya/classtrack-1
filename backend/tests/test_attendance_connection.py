import sys
from datetime import date
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(str(Path(__file__).resolve().parents[2]))

from backend.app import models, schemas, auth  # noqa: E402
from backend.app.routers.attendance import mark_attendance, get_attendance  # noqa: E402
from backend.app.database import Base  # noqa: E402


SQLALCHEMY_DATABASE_URL = "sqlite:///./test_attendance.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)


def test_mark_attendance_records_teacher():
    db = TestingSessionLocal()
    hashed = auth.get_password_hash("secret")
    teacher_user = models.User(
        email="teacher@example.com",
        hashed_password=hashed,
        role="teacher",
        name="Teach",
        is_active=True,
    )
    db.add(teacher_user)
    db.commit()
    db.refresh(teacher_user)

    teacher_model = models.Teacher(
        user_id=teacher_user.id, teacher_id="T001", department="Math"
    )
    db.add(teacher_model)
    db.commit()
    db.refresh(teacher_model)
    db.refresh(teacher_user)

    student_user = models.User(
        email="student@example.com",
        hashed_password=auth.get_password_hash("pass123"),
        role="student",
        name="Stud One",
        is_active=True,
    )
    db.add(student_user)
    db.commit()
    db.refresh(student_user)

    student_model = models.Student(
        user_id=student_user.id,
        student_id="S001",
        grade_level="Freshman",
        department="General",
    )
    db.add(student_model)
    db.commit()
    db.refresh(student_model)

    record = schemas.AttendanceBase(
        student_id=student_model.id,
        date=date.today(),
        status="present",
        subject="Math",
    )

    result = mark_attendance(record, current_user=teacher_user, db=db)
    assert result.teacher_id == teacher_model.id

    records = get_attendance(current_user=teacher_user, db=db)
    assert len(records) == 1
    assert records[0].teacher_id == teacher_model.id
    db.close()

