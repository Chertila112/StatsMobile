from fastapi import HTTPException
import httpx
from redis.asyncio import Redis
import json
from .user_service import UserService
from core.config import settings

class RankedService:
    def __init__(self, http_client: httpx.AsyncClient, redis: Redis, user_service: UserService):
        self.http_client = http_client
        self.redis = redis
        self.user_service = user_service

    async def get_user_rank(self, username: str, tag: str, region: str):
        redis_key = f"ranked/{username}#{tag}"
        cached_ranked = await self.redis.get(redis_key)
        if cached_ranked:
            return json.loads(cached_ranked)

        user = await self.user_service.get_user_by_riot_id(username, tag)
        puuid = user.puuid

        url = f"https://{region}.api.riotgames.com/lol/league/v4/entries/by-puuid/{puuid}"
        try:
            response = await self.http_client.get(url, headers=settings.get_riot_headers())
            response.raise_for_status()
            ranked_data = response.json()
            await self.redis.set(redis_key, json.dumps(ranked_data), ex=300)
            return ranked_data
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Riot API error")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal Server error: {e}")
