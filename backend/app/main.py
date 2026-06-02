from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.cafes import router as cafes_router
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Read allowed origins from environment variable (comma-separated). In dev, default to allow all.
_allowed = os.getenv("ALLOWED_ORIGINS")
if _allowed:
    allow_origins = [o.strip() for o in _allowed.split(",") if o.strip()]
else:
    allow_origins = ["*"] if os.getenv("DEV", "true").lower() == "true" else []

# Browsers reject `Access-Control-Allow-Origin: *` together with credentials, so
# only enable credentials when origins are explicitly listed.
allow_credentials = "*" not in allow_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=allow_credentials,
)

app.include_router(cafes_router)

@app.get("/")
async def read_root():
    return {"Hello": "World"}