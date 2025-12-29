from fastapi import Depends, APIRouter
from .dependencies import get_main_user_info_service
from services.main_user_info_service import MainUserInfoService

router = APIRouter()

@router.get("/{region}/{username}/{tag}")
async def get_main_user_info(username: str, tag: str, region:str, main_user_info_service: MainUserInfoService = Depends(get_main_user_info_service)):
    return await main_user_info_service.get_main_user_info(username, tag, region)
