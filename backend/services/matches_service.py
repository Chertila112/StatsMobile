from fastapi import HTTPException
import httpx
from redis.asyncio import Redis
import json
from core.config import settings
from .main_user_info_service import MainUserInfoService
import asyncio

class MatchesService:
    def __init__(self, http_client: httpx.AsyncClient, redis: Redis, main_user_info_service: MainUserInfoService):
        self.http_client = http_client
        self.redis = redis
        self.main_user_info_service = main_user_info_service

    async def get_match_by_id(self, matchId: str):
        try:
            cached_match = await self.redis.get(matchId)
            if cached_match:
                return json.loads(cached_match)
        except Exception:
            pass

        url = f'https://europe.api.riotgames.com/lol/match/v5/matches/{matchId}'
        try:
            response = await self.http_client.get(url=url, headers=settings.get_riot_headers())
            
            if response.status_code == 429:
                retry_after = response.headers.get("Retry-After")
                raise HTTPException(status_code=429, detail=f"Rate limit exceeded. Retry after {retry_after}s")
            
            response.raise_for_status()
            match = response.json()
            
            await self.redis.set(matchId, json.dumps(match), ex=3600 * 24)
            return match
            
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                raise HTTPException(detail=f'Match {matchId} not found', status_code=404)
            raise HTTPException(detail=f'Riot API Error: {e.response.status_code}', status_code=e.response.status_code)
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(detail='Internal server error', status_code=500)

    async def get_matches(self, username: str, tag: str, region: str):
        user_info = await self.main_user_info_service.get_main_user_info(username, tag, region)
        match_ids = user_info.get("matchesIds", [])

        if not match_ids:
            return []

        tasks = [self.get_match_by_id(match_id) for match_id in match_ids]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        matches = []
        for res in results:
            if not isinstance(res, Exception):
                matches.append(res)

        return matches
