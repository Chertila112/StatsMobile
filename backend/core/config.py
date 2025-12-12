import os
from dotenv import load_dotenv

load_dotenv("/home/kikbutt/Projects/StatsMobile/backend/venv/env/API_KEY.env")

class Settings:
    def __init__(self):
        self.RIOT_API_KEY = os.getenv("RIOT_API_KEY")

    def get_riot_headers(self) -> dict[str, str]:
        if not self.RIOT_API_KEY:
            raise RuntimeError("RIOT_API_KEY is missing in environment variables")

        return {
            "X-Riot-Token": self.RIOT_API_KEY
        }

settings = Settings()
