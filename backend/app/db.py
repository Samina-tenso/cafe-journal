from typing import Generator
from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv
import os

load_dotenv()
DEV = os.getenv("DEV", "true").lower() == "true"

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise SystemExit("Set DATABASE_URL in .env")

connect_args = {} if DEV else {"sslmode": "require"}

engine = create_engine(DATABASE_URL, connect_args=connect_args, echo=DEV)


def get_session() -> Generator[Session, None, None]:
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()