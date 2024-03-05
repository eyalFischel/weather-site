import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';
import WeatherComponent from './components/WeatherComponent';
import ShowCityWeather from './components/ShowCityWeather';
import Map from './components/Map';
function App() {
    const [cities, setCities, loading] = WeatherComponent();
    const [selectedCity, setSelectedCity] = useState();
    const handleCitySelect = (city) => {
        setSelectedCity(city);
    };
    const handleRefresh = async (cities) => {
        setCities(cities);
    };
    if (loading) {
        return _jsx("h1", { children: "Loading..." });
    }
    ;
    return (_jsxs("div", { className: "App", children: [_jsx("h1", { className: "app-title", children: "Weather" }), _jsx(SearchBar, { setCities: handleRefresh }), _jsx(Map, { cities: cities, onSelectCity: handleCitySelect }), selectedCity && cities && cities[selectedCity] && _jsx(ShowCityWeather, { city: cities[selectedCity] })] }));
}
export default App;
