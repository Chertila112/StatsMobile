from fastapi import FastAPI, HTTPException
import httpx
from redis.asyncio import Redis
import os
from dotenv import load_dotenv
import json

load_dotenv("../API_KEY.env")

api_key = os.getenv("RIOT_API_KEY")

header={"X-Riot-Token": api_key}



app = FastAPI()

@app.on_event("startup")
async def on_startup():
    app.state.redis = Redis(host = "localhost", port = 6379, decode_responses=True)
    app.state.http_client = httpx.AsyncClient()

    
@app.get("/mastery/{username}/{tag}")
async def get_user_mastery(username:str, tag:str,  count: int = 3):

    user = await get_user(username, tag)
    puuid = user["puuid"]

    redis = app.state.redis
    
    try:
        value = await redis.get(f"mastery/{username}#{tag}")
        
        if value is not None:
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                await redis.delete(f"mastery/{username}#{tag}")
        url = f"https://ru.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}/top?count={count}"
        try:
            responce = await app.state.http_client.get(url, headers=header)
            responce.raise_for_status()
        except Exception as e:
            raise HTTPException(status_code=502, detail="Riot API unreachable")
        data = responce.json()
        await redis.set(f"mastery/{username}#{tag}", json.dumps(data), ex=300)
        return data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server error: {e}")
        

@app.get("/user/{username}/{tag}")
async def get_user(username: str, tag:str):
    redis = app.state.redis

    try:
        value = await redis.get(f"{username}#{tag}")

        if value is not None:
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                await redis.delete(f"{username}#{tag}")

        url = f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{username}/{tag}"

        try:
            response = await app.state.http_client.get(url, headers=header)
            response.raise_for_status()
        except Exception as e:
            raise HTTPException(status_code=502, detail="Riot API unreachable")

        data = response.json()

        await redis.set(f"{username}#{tag}", json.dumps(data), ex=300)

        return data

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")
