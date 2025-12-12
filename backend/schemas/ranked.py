from pydantic import BaseModel

class Ranked(BaseModel):
    username: str
    queueType: str
    tier: str
    rank: str
    wins: int
    losses: int


