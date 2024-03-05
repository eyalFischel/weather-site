import React, { useState } from 'react';
import './SearchBar.css';
import { addCity, handleRefresh } from '../apis';
import { FaSyncAlt } from 'react-icons/fa'; // Import the refresh icon from react-icons

function SearchBar({ setCities } : {setCities: any}) {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleAddCity = async () => {
    const res: any = await addCity(city.toLowerCase());
    if (typeof res === 'object' && res.error)  {
      alert(`Severity: warning\nMessage: ${res.error}`);
    } else {
      alert(`Severity: success\nMessage: Weather refreshed successfully!`);
    }
    setCity('');
  };

  const handleRefreshWeather = async () => {
    setLoading(true); 
    const res: any = await handleRefresh(); 
    if (typeof res === 'object' && res.error) {
      alert(`Severity: warning\nMessage: ${res.error}`);
    } else {
      setCities(res);
      alert(`Severity: success\nMessage: Weather refreshed successfully!`);
    }
    setLoading(false);
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={handleAddCity}>Add City</button>
      <button onClick={handleRefreshWeather}>
        {loading ? <FaSyncAlt className="refresh-icon" /> : 'Refresh Weather'}
      </button>
    </div>
  );


      }

export default SearchBar;
