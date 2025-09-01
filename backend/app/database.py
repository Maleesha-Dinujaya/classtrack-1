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

# Track whether the database has already been initialised. This allows modules
# that import `get_db` directly (without running the FastAPI application in
# ``main.py``) to safely ensure that the migration logic in ``init_db`` runs at
# least once. Without this guard, existing SQLite databases created prior to
# the addition of the ``teacher_id`` column would fail with an
# ``OperationalError`` when attendance records are inserted.
_INITIALIZED = False


def init_db() -> None:
    """Create tables and ensure required columns exist."""
    Base.metadata.create_all(bind=engine)

    inspector = inspect(engine)
    columns = [col["name"] for col in inspector.get_columns("attendance")]
    if "teacher_id" not in columns:
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE attendance ADD COLUMN teacher_id INTEGER"))

def get_db():
    """Yield a database session, initialising the schema on first use."""

    global _INITIALIZED
    if not _INITIALIZED:
        init_db()
        _INITIALIZED = True

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
