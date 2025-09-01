import sys
from pathlib import Path

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker

sys.path.append(str(Path(__file__).resolve().parents[2]))

from backend.app import models  # noqa: F401
from backend.app import database


def test_init_db_adds_missing_teacher_id(tmp_path, monkeypatch):
    db_url = f"sqlite:///{tmp_path}/legacy.db"
    engine = create_engine(db_url, connect_args={"check_same_thread": False})
    with engine.begin() as conn:
        conn.execute(
            text(
                """
                CREATE TABLE attendance (
                    id INTEGER PRIMARY KEY,
                    student_id INTEGER,
                    date DATE,
                    status VARCHAR,
                    subject VARCHAR
                )
                """
            )
        )
    session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    monkeypatch.setattr(database, "engine", engine)
    monkeypatch.setattr(database, "SessionLocal", session_local)

    from backend.app.main import on_startup

    on_startup()

    inspector = inspect(engine)
    columns = [c["name"] for c in inspector.get_columns("attendance")]

    assert "teacher_id" in columns
