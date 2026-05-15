from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from uuid import uuid4

class Location(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    latitude: float
    longitude: float
    address: str
    city: str
    country: str

class Cafe(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    name: str
    location_id: Optional[str] = Field(default=None, foreign_key="location.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
