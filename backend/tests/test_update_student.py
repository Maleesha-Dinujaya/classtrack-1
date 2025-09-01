import sys
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(str(Path(__file__).resolve().parents[2]))

from backend.app import models, schemas, auth  # noqa: E402
from backend.app.routers.teachers import add_student, update_student  # noqa: E402
from backend.app.database import Base  # noqa: E402

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_update.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

def test_update_student_function():
    db = TestingSessionLocal()
    hashed = auth.get_password_hash("secret")
    teacher = models.User(
        email="teacher@example.com",
        hashed_password=hashed,
        role="teacher",
        name="Teach",
        is_active=True,
    )
    db.add(teacher)
    db.commit()
    db.refresh(teacher)

    student_schema = schemas.StudentCreate(
        email="student@example.com",
        password="pass123",
        name="Stud One",
        grade_level="Freshman",
        department="General",
    )

    student = add_student(student_schema, current_user=teacher, db=db)

    update_schema = schemas.StudentUpdate(
        name="Updated Student",
        department="Science",
    )

    updated = update_student(student.id, update_schema, current_user=teacher, db=db)
    assert updated.user.name == "Updated Student"
    assert updated.department == "Science"
    db.close()
