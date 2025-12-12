from fastapi import APIRouter
from . import user, mastery, ranked

router = APIRouter()

router.include_router(user.router, prefix="/user", tags=["user"])
router.include_router(mastery.router, prefix="/mastery", tags=["mastery"])
router.include_router(ranked.router, prefix="/ranked", tags=["ranked"])
