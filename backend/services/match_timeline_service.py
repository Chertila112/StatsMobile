from fastapi import HTTPException
import httpx
from redis.asyncio import Redis
import json
from core.config import settings

class MatchTimelineService:
    def __init__(self, http_client: httpx.AsyncClient, redis: Redis):
        self.http_client = http_client
        self.redis = redis

    async def get_match_timeline(self, matchId: str):
        redis_key = f"timeline:{matchId}"
        try:
            cached_timeline = await self.redis.get(redis_key)
            if cached_timeline:
                return json.loads(cached_timeline)
        except Exception:
            pass

        url = f'https://europe.api.riotgames.com/lol/match/v5/matches/{matchId}/timeline'
        try:
            response = await self.http_client.get(url=url, headers=settings.get_riot_headers())
            
            if response.status_code == 429:
                retry_after = response.headers.get("Retry-After")
                raise HTTPException(status_code=429, detail=f"Rate limit exceeded. Retry after {retry_after}s")
            
            response.raise_for_status()
            timeline = response.json()
            
            await self.redis.set(redis_key, json.dumps(timeline), ex=3600 * 24)
            return timeline
            
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                raise HTTPException(detail=f'Timeline for match {matchId} not found', status_code=404)
            raise HTTPException(detail=f'Riot API Error: {e.response.status_code}', status_code=e.response.status_code)
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(detail='Internal server error', status_code=500)
