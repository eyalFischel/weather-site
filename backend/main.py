import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import toml

from models import site
from utils import get_all_weather_info, get_weather

# Create a FastAPI instance and set up the configuration
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

basefolder = os.path.dirname(__file__)
config = toml.load(os.path.join(basefolder, "config.toml"))
openweathermap_api_key = config['openweathermap']['api_key']
cities = config["other"]["cities"]
app.state.cities_info = {}

# TODO: does the API have a bulk option ?? 
@app.get("/weather/")
async def weather_sites():
    for city in cities:
       app.state.cities_info = await get_all_weather_info(openweathermap_api_key, city, app.state.cities_info)
    return app.state.cities_info

@app.post("/weather/refresh")
async def refresh_weather():
    for city in app.state.cities_info:
        city_weather = await get_weather(openweathermap_api_key, app.state.cities_info[city]["lat"], app.state.cities_info[city]["lon"])
        app.state.cities_info[city] = city_weather
    return app.state.cities_info

@app.post("/weather/add")
async def add_site(site: site):
    if site.city in app.state.cities_info:
        return {"error": f"City {site.city} already exists"}
    else:
        if site.city:
            city = site.city
        elif site.location:
            city = site.location
        else:
            return {"error": "No city or location provided"}
        
        app.state.cities_info = await get_all_weather_info(openweathermap_api_key, city, app.state.cities_info)
        return app.state.cities_info
