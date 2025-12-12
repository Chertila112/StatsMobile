from fastapi import Request, Depends
from redis.asyncio import Redis
import httpx
from services.user_service import UserService
from services.mastery_service import MasteryService
from repositories.user import UserRepository
from services.ranked_service import RankedService


def get_redis(request: Request) -> Redis:
    return request.app.state.redis

def get_http_client(request: Request) -> httpx.AsyncClient:
    return request.app.state.http_client

def get_user_repository() -> UserRepository:
   return UserRepository()

def get_user_service(
    http_client: httpx.AsyncClient = Depends(get_http_client),
    user_repository: UserRepository = Depends(get_user_repository)
) -> UserService:
    return UserService(http_client, user_repository)

def get_mastery_service(
    redis: Redis = Depends(get_redis),
    http_client: httpx.AsyncClient = Depends(get_http_client),
    user_service: UserService = Depends(get_user_service)
) -> MasteryService:
    return MasteryService(http_client, redis, user_service)

def get_ranked_service(
    redis: Redis= Depends(get_redis),
    http_client: httpx.AsyncClient = Depends(get_http_client),
        user_service: UserService = Depends(get_user_service)
) -> RankedService:
    return RankedService(http_client, redis, user_service)
