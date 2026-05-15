from sqlmodel import SQLModel, create_engine
from dotenv import load_dotenv
import os, sys

load_dotenv()
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise SystemExit("Set DATABASE_URL in .env")

# make backend/app importable
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from app import models  # backend/app/models.py must exist

engine = create_engine(DATABASE_URL, echo=True)
SQLModel.metadata.create_all(engine)
print("tables created")
