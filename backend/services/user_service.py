from fastapi import HTTPException
import httpx
from repositories.user import UserRepository
from models.models import User
from core.config import settings

class UserService:
    def __init__(self, http_client: httpx.AsyncClient, user_repository: UserRepository):
        self.http_client = http_client
        self.user_repository = user_repository

    async def get_user_by_riot_id(self, username: str, tag: str) -> User:
        
        url = f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{username}/{tag}"
        try:
            response = await self.http_client.get(url, headers=settings.get_riot_headers())
            response.raise_for_status()
            user_data_from_api = response.json()
            puuid = user_data_from_api.get("puuid")

            if not puuid:
                raise HTTPException(status_code=500, detail="Riot API did not return a puuid.")

            db_user = self.user_repository.get_user_by_puuid(puuid)
            if db_user:
                return db_user

            user_to_create = {
                "username": user_data_from_api.get("gameName"),
                "tag": user_data_from_api.get("tagLine"),
                "puuid": puuid
            }
            new_user = self.user_repository.create_user(user_to_create)
            return new_user

        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Riot API error")
        except Exception as e:
            if isinstance(e, HTTPException):
                raise
            raise HTTPException(status_code=500, detail=f"Internal Server error: {e}")

