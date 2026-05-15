from typing import Optional, List
from datetime import datetime
from sqlmodel import SQLModel


class CafeBase(SQLModel):
    name: str


class CafeCreate(CafeBase):
    location_id: Optional[str] = None


class CafeUpdate(SQLModel):
    name: Optional[str] = None
    location_id: Optional[str] = None


class CafeRead(CafeBase):
    id: str
    location_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

class CafeDelete(SQLModel):
    id: str

            