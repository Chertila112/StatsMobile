from sqlmodel import Session, select
from models.models import User
from core.database import get_session

class UserRepository:
    def __init__(self):
        self.get_session = get_session

    def get_user_by_puuid(self, puuid: str) -> User | None:
        with self.get_session() as session:
            statement = select(User).where(User.puuid == puuid)
            return session.exec(statement).first()

    def create_user(self, user_data: dict) -> User:
        with self.get_session() as session:
            user = User(**user_data)
            session.add(user)
            session.commit()
            session.refresh(user)
            return user
