
from fastapi import Depends, APIRouter
from .dependencies import get_ranked_service
from services.ranked_service import RankedService

router = APIRouter()

@router.get("/{region}/{username}/{tag}")
async def get_user_rank(username: str, tag: str, region:str, ranked_service: RankedService = Depends(get_ranked_service)):
    return await ranked_service.get_user_rank(username, tag, region)
