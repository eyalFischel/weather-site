import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import './ShowCityWeather.css';
function ShowCityWeather({ city }) {
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
    return (_jsxs("div", { className: "showWeather", children: [_jsxs("div", { className: 'img', children: [city.weather[0].main === 'Rain' && _jsx("img", { src: "rain.png", alt: "Rainy" }), city.weather[0].main === 'Clouds' && _jsx("img", { src: "cloudy.png", alt: "Cloudy" }), city.weather[0].main === 'Clear' && _jsx("img", { src: "sun.png", alt: "Sunny" })] }), _jsxs("div", { className: "weatherInfo", children: [_jsxs("p", { className: "temp", children: [(city.main.temp - 273.15).toFixed(0), " C"] }), _jsx("p", { className: "weather", children: city.weather[0].main }), _jsxs("p", { className: "cityName", children: [city.name, ", ISR"] }), _jsxs("p", { className: "wind", children: [" ", city.wind.speed, " Km/H ", _jsx("br", {}), "Wind speed"] }), _jsxs("p", { className: "humidity", children: [" ", city.main.humidity, "% ", _jsx("br", {}), " Humidity"] })] })] }));
}
export default ShowCityWeather;
