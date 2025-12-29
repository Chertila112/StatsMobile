from services.matches_service import MatchesService
from fastapi import APIRouter, Depends
from .dependencies import get_matches_service

router = APIRouter()

@router.get('/{matchId}')
async def get_match_by_id(matchId: str, matches_service: MatchesService = Depends(get_matches_service)):
    return await matches_service.get_match_by_id(matchId=matchId)


