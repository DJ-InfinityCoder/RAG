"""
Database engine, session factory, and base model.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config import DATABASE_URL, get_logger

logger = get_logger("askdoc.database")

# Supabase / Postgres DATABASE_URL configuration
engine = None
SessionLocal = None

if not DATABASE_URL or "your_" in DATABASE_URL:
    logger.warning("DATABASE_URL is not configured with a valid connection string. Database features will fail.")
else:
    try:
        _db_url = DATABASE_URL
        # Normalize scheme prefixes
        if _db_url.startswith("postgres://"):
            _db_url = _db_url.replace("postgres://", "postgresql://", 1)

        is_sqlite = "sqlite" in _db_url

        if not is_sqlite:
            # Use psycopg3 dialect (psycopg[binary]) — avoids psycopg2 dependency on Vercel.
            # Strip any existing dialect suffix then re-apply +psycopg.
            if _db_url.startswith("postgresql+psycopg2://"):
                _db_url = _db_url.replace("postgresql+psycopg2://", "postgresql+psycopg://", 1)
            elif _db_url.startswith("postgresql://"):
                _db_url = _db_url.replace("postgresql://", "postgresql+psycopg://", 1)

        engine_kwargs = {}
        if is_sqlite:
            engine_kwargs["connect_args"] = {"check_same_thread": False}
        else:
            engine_kwargs["pool_pre_ping"] = True

        engine = create_engine(_db_url, **engine_kwargs)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    except Exception as e:
        logger.error(f"Failed to create database engine: {e}. Database features will be disabled.")
        engine = None
        SessionLocal = None


Base = declarative_base()

def get_db():
    if SessionLocal is None:
        raise Exception("Database not configured. Please set DATABASE_URL.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
