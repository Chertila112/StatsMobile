from pydantic import BaseModel

class UserSchema(BaseModel):
    username: str
    tag: str
    puuid: str

