from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Use SQLite for local dev, can be swapped for Postgres via env var
# DATABASE_URL = "postgresql://user:password@localhost/dbname"
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("WARNING: DATABASE_URL is not set. Database features will fail.")
    engine = None
    SessionLocal = None
else:
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

    engine = create_engine(
        DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    if SessionLocal is None:
        raise Exception("Database not configured. Please set DATABASE_URL.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
