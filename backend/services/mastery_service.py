from fastapi import HTTPException
import httpx
from redis.asyncio import Redis
import json
from .user_service import UserService
from core.config import settings

class MasteryService:
    def __init__(self, http_client: httpx.AsyncClient, redis: Redis, user_service: UserService):
        self.http_client = http_client
        self.redis = redis
        self.user_service = user_service

    async def get_user_mastery(self, username: str, tag: str, count: int = 3):
        redis_key = f"mastery/{username}#{tag}"
        cached_mastery = await self.redis.get(redis_key)
        if cached_mastery:
            return json.loads(cached_mastery)

        user = await self.user_service.get_user_by_riot_id(username, tag)
        puuid = user.puuid

        url = f"https://ru.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}/top?count={count}"
        try:
            response = await self.http_client.get(url, headers=settings.get_riot_headers())
            response.raise_for_status()
            mastery_data = response.json()
            await self.redis.set(redis_key, json.dumps(mastery_data), ex=300)  # Cache for 5 minutes
            return mastery_data
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Riot API error")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal Server error: {e}")
