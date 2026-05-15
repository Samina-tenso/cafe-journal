from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.cafes import router as cafes_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["NEXT_PUBLIC_API_URL"],  # Adjust this in production to restrict origins
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cafes_router)

@app.get("/")
async def read_root():
    return {"Hello": "World"}