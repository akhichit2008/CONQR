import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

# dotenv's default upward search walks from the caller's stack frame, which
# resolves incorrectly under uvicorn's --app-dir flag. Pointing it at this
# file's own directory sidesteps that instead of relying on it.
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env"))

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./conqr.db")

# check_same_thread=False is required for SQLite when the connection is
# shared across FastAPI's threaded request handling.
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
