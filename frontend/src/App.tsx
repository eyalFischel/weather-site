import { useState} from 'react';
import SearchBar from './components/SearchBar';
import './App.css';
import WeatherComponent from './components/WeatherComponent';
import ShowCityWeather from './components/ShowCityWeather';
import Map from './components/Map';

function App() {
  
  const [cities, setCities, loading ] = WeatherComponent() as [Record<string, any>, (cities: Record<string, any>) => void, boolean];
  const [selectedCity, setSelectedCity] = useState<string>();

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };
  const handleRefresh = async (cities: any) => {
    setCities(cities as typeof cities);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  };

  return (
    <div className="App">
      <h1 className="app-title">Weather</h1>
      <SearchBar setCities={handleRefresh} />
      <Map cities={cities} onSelectCity={handleCitySelect} />
      {selectedCity && cities && cities[selectedCity as keyof typeof cities] && <ShowCityWeather city={cities[selectedCity as keyof typeof cities]} />}
    </div>
  );
}

export default App;
