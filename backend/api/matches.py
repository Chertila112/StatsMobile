from services.matches_service import MatchesService
from fastapi import APIRouter, Depends
from .dependencies import get_matches_service

router = APIRouter()

@router.get("/{region}/{username}/{tag}")
async def get_matches(region: str, username: str, tag: str, matches_service: MatchesService = Depends(get_matches_service)):
    return await matches_service.get_matches(username, tag, region)
