from fastapi import APIRouter

from . import user, mastery, match_by_id, main_user_info, matches, match_timeline

router = APIRouter()

router.include_router(user.router, prefix="/user", tags=["user"])
router.include_router(mastery.router, prefix="/mastery", tags=["mastery"])
router.include_router(main_user_info.router, prefix="/main_user_info", tags=["main_user_info"])
router.include_router(matches.router, prefix='/matches', tags=["matches"])
router.include_router(match_by_id.router, prefix='/match', tags=['match'])
router.include_router(match_timeline.router, prefix='/match', tags=['match'])
