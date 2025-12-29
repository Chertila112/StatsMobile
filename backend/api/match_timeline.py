from services.match_timeline_service import MatchTimelineService
from fastapi import APIRouter, Depends
from .dependencies import get_match_timeline_service

router = APIRouter()

@router.get('/{matchId}/timeline')
async def get_match_timeline(matchId: str, match_timeline_service: MatchTimelineService = Depends(get_match_timeline_service)):
    return await match_timeline_service.get_match_timeline(matchId=matchId)
