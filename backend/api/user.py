from fastapi import Depends, APIRouter, Request
from .dependencies import get_user_service
from services.user_service import UserService

router = APIRouter()

@router.get("/{username}/{tag}")
async def get_user(username: str, tag: str, user_service: UserService = Depends(get_user_service)):
    return await user_service.get_user_by_riot_id(username, tag)
