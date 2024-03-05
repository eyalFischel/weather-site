import { useEffect } from 'react';
import './ShowCityWeather.css';

function ShowCityWeather({ city }: { city: any }) {
    useEffect(() => {
        const weather = city.weather[0].main;
        let backgroundColor = '#ffffff';
        
        switch (weather) {
            case 'Rain':
                backgroundColor = '#504c4c'; // Gray
                break;
            case 'Clouds':
                backgroundColor = '#504c4c'; // Gray
                break;
            case 'Clear':
                backgroundColor = '#a4c2f4'; // Yellow
                break;
            default:
                break;
        }

        document.body.style.backgroundColor = backgroundColor; // Set the background color of the body

        return () => {
            document.body.style.backgroundColor = ''; // Reset the background color when the component unmounts
        };
    }, [city]); // Add city as a dependency

    return (
        <div className="showWeather">
            <div className='img'>
                {city.weather[0].main === 'Rain' && <img src="rain.png" alt="Rainy" />}
                {city.weather[0].main === 'Clouds' && <img src="cloudy.png" alt="Cloudy" />}
                {city.weather[0].main === 'Clear' && <img src="sun.png" alt="Sunny" />}
            </div>
            <div className="weatherInfo">
                <p className="temp">{(city.main.temp - 273.15).toFixed(0)} C</p>
                <p className="weather">{city.weather[0].main}</p>
                <p className="cityName">{city.name}, ISR</p>
                <p className="wind"> {city.wind.speed} Km/H <br/>Wind speed</p>
                <p className="humidity"> {city.main.humidity}% <br/> Humidity</p>
            </div>
        </div>
    );
}

export default ShowCityWeather;
