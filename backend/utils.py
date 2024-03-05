import requests

async def get_weather(api_key: str, lat: float, lon: float) -> dict:
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"
    response = requests.get(url).json()
    
    if not response:
        return {"error": f"No data found for the given cor- {lat}, {lon}"}
    else:
        response.update({"lat": lat, "lon": lon})
        return response

async def get_city_lat_lon(api_key: str, city: str) -> dict:
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={city},IL&limit=5&appid={api_key}"
    response = requests.get(url).json()
    if not response:
        return {"error": f"No data found for the given location - {city}"}
    else: # TODO check there is no duplicate cities
        return {
            "city": response[0]["state"],
            "lat": response[0]["lat"],
            "lon": response[0]["lon"]
        }
    
async def get_all_weather_info(api_key: str, city: str, cities_info: dict) -> dict:
    city_lat_lon = await get_city_lat_lon(api_key, city)
    if "error" in city_lat_lon:
         print(city_lat_lon, 404)
    else:
        city_weather = await get_weather(api_key, city_lat_lon["lat"], city_lat_lon["lon"])
        cities_info[city] = city_weather
    return cities_info