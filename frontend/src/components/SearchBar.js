import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './SearchBar.css';
import { addCity, handleRefresh } from '../apis';
import { FaSyncAlt } from 'react-icons/fa'; // Import the refresh icon from react-icons
function SearchBar({ setCities }) {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleAddCity = async () => {
        const res = await addCity(city.toLowerCase());
        if (res.error) {
            alert(`Severity: warning\nMessage: ${res.error}`);
        }
        else {
            alert(`Severity: success\nMessage: Weather refreshed successfully!`);
        }
        setCity('');
    };
    const handleRefreshWeather = async () => {
        setLoading(true);
        const res = await handleRefresh();
        if (res.error) {
            alert(`Severity: warning\nMessage: ${res.error}`);
        }
        else {
            setCities(res);
            alert(`Severity: success\nMessage: Weather refreshed successfully!`);
        }
        setLoading(false);
    };
    return (_jsxs("div", { className: "search", children: [_jsx("input", { type: "text", placeholder: "Enter city...", value: city, onChange: handleCityChange }), _jsx("button", { onClick: handleAddCity, children: "Add City" }), _jsx("button", { onClick: handleRefreshWeather, children: loading ? _jsx(FaSyncAlt, { className: "refresh-icon" }) : 'Refresh Weather' })] }));
}
export default SearchBar;
