from fastapi import HTTPException
import httpx
from redis.asyncio import Redis
import json
from .user_service import UserService
from core.config import settings

class MainUserInfoService:
    def __init__(self, http_client: httpx.AsyncClient, redis: Redis, user_service: UserService):
        self.http_client = http_client
        self.redis = redis
        self.user_service = user_service

    async def get_main_user_info(self, username: str, tag: str, region: str, count: int = 10):
        redis_key = f"main_user_info/{username}#{tag}"
        cached_main_user_info = await self.redis.get(redis_key)
        if cached_main_user_info:
            return json.loads(cached_main_user_info)

        user = await self.user_service.get_user_by_riot_id(username, tag)
        puuid = user.puuid

        url_ranked = f"https://{region}.api.riotgames.com/lol/league/v4/entries/by-puuid/{puuid}"
        url_assets = f"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
        url_version = 'https://ddragon.leagueoflegends.com/api/versions.json'
        url_matches = f'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count={count}'
        try:
            response = await self.http_client.get(url_ranked, headers=settings.get_riot_headers())
            response.raise_for_status()
            ranked_data = response.json()
            response2 = await self.http_client.get(url_assets, headers=settings.get_riot_headers())
            response2.raise_for_status()
            userinfo = response2.json()
            version = await self.http_client.get(url_version, headers=settings.get_riot_headers())
            ddversion = version.json()
            matches_responce = await self.http_client.get(url_matches, headers=settings.get_riot_headers())
            matches_responce.raise_for_status()
            matchesIds = matches_responce.json()
            final = ranked_data[0]
            final["level"] = userinfo["summonerLevel"]
            final["iconId"] = userinfo["profileIconId"]
            final["username"] = user.username
            final["tag"] = user.tag
            final["region"] = region
            final["version"] = ddversion[0]
            final["matchesIds"] = matchesIds;
            await self.redis.set(redis_key, json.dumps(final), ex=3600)
            return final
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Riot API error")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Code: {e}")
