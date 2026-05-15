from ..db import get_session
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from .. import schemas
from .. import models

router = APIRouter(prefix="/cafes", tags=["cafes"])

@router.get("/", response_model=list[schemas.CafeRead])
def read_cafes(session: Session = Depends(get_session)):
    cafes = session.exec(select(models.Cafe)).all()
    return cafes

@router.post("/", response_model=schemas.CafeRead)
def create_cafe(cafe: models.Cafe, session: Session = Depends(get_session)):
    new_cafe = models.Cafe(**cafe.model_dump())
    session.add(new_cafe)
    session.commit()
    session.refresh(new_cafe)
    return new_cafe

@router.get("/{cafe_id}", response_model=schemas.CafeRead)
def read_cafe(cafe_id: str, session: Session = Depends(get_session)):
    cafe = session.get(models.Cafe, cafe_id)
    if not cafe:
        raise HTTPException(status_code=404, detail="Cafe not found")
    return cafe

@router.patch("/{cafe_id}", response_model=schemas.CafeRead)
def update_cafe(cafe_id: str, cafe_update: models.Cafe, session: Session = Depends(get_session)):
    cafe = session.get(models.Cafe, cafe_id)
    if not cafe:
        raise HTTPException(status_code=404, detail="Cafe not found")
    cafe_data = cafe_update.model_dump(exclude_unset=True)
    for key, value in cafe_data.items():
        setattr(cafe, key, value)
    session.commit()
    session.refresh(cafe)
    return cafe

@router.delete("/{cafe_id}")
def delete_cafe(cafe_id: str, session: Session = Depends(get_session)):
    cafe = session.get(models.Cafe, cafe_id)
    if not cafe:
        raise HTTPException(status_code=404, detail="Cafe not found")
    session.delete(cafe)
    session.commit()
    return {"detail": "Cafe deleted"}