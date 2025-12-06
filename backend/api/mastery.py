from fastapi import Depends, APIRouter
from .dependencies import get_mastery_service
from services.mastery_service import MasteryService

router = APIRouter()

@router.get("/{username}/{tag}")
async def get_user_mastery(username: str, tag: str, count: int = 3, mastery_service: MasteryService = Depends(get_mastery_service)):
    return await mastery_service.get_user_mastery(username, tag, count)
