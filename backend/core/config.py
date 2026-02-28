import os
from pathlib import Path
from dotenv import load_dotenv

# Путь к .env относительно текущего скрипта
dotenv_path = Path(__file__).parent.parent / "API_KEY.env"
load_dotenv(dotenv_path)


class Settings:
    def __init__(self):
        self.RIOT_API_KEY = os.getenv("RIOT_API_KEY")

    def get_riot_headers(self) -> dict[str, str | None]:
        return {"X-Riot-Token": self.RIOT_API_KEY}


settings = Settings()
print(settings.get_riot_headers())
