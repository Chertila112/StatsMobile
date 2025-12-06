from fastapi import FastAPI
import httpx
from redis.asyncio import Redis
from api.router import router as api_router
from core.database import create_db_and_tables

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    create_db_and_tables()
    app.state.redis = Redis(host="localhost", port=6379, decode_responses=True)
    app.state.http_client = httpx.AsyncClient()

app.include_router(api_router, prefix="/api")
