from sqlalchemy import create_engine, inspect, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def init_db() -> None:
    """Create tables and ensure required columns exist."""
    Base.metadata.create_all(bind=engine)

    inspector = inspect(engine)
    columns = [col["name"] for col in inspector.get_columns("attendance")]
    if "teacher_id" not in columns:
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE attendance ADD COLUMN teacher_id INTEGER"))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
