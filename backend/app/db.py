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

# SQL echo is noisy (logs every statement) and is a real resource sink under
# load. Keep it opt-in via SQL_ECHO rather than tying it to DEV. pool_pre_ping
# guards against Postgres dropping idle pooled connections.
SQL_ECHO = os.getenv("SQL_ECHO", "false").lower() == "true"

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    echo=SQL_ECHO,
    pool_pre_ping=True,
)


def get_session() -> Generator[Session, None, None]:
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()