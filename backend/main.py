from fastapi import FastAPI
import requests
import httpx

app = FastAPI()

key = "[deleted]"


@app.get("/")
def root():
    return {"message": "hello, world!"}

@app.get("/userinfo")
async def user(usrId: str):
    url = f"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={key}&steamids={usrId}"
    async with httpx.AsyncClient() as client:
        responce = await client.get(url)
        user = responce.json()
        return user
