import { useState, useEffect } from 'react';
import { getCities } from '../apis';

const WeatherComponent = () => {
  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const citiesData = await getCities();
        setCities(citiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setLoading(false);
      }
    })();
  }, []); // Empty dependency array ensures this effect runs only once, like componentDidMount

  return [cities, setCities, loading, setLoading];
};

export default WeatherComponent;
