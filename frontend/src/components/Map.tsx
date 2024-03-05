import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import './Map.css';

function Map({cities, onSelectCity} : {cities: any, onSelectCity: any}) {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://api.maptiler.com/maps/streets/style.json?key=0PppZ3jW1hlvybSSUypz', // style URL
      center: [35.212, 31.7959],
      zoom: 8 // starting zoom
    });
    Object.entries(cities).forEach(([key, city]: [string, any]) => {
      const el = document.createElement('div');
      el.className = 'marker';
      if (city.weather[0].main === 'Clouds') {
        el.style.backgroundImage = 'url(/cloudy_50x54.png)';
      } else if (city.weather[0].main === 'Rain') {
        el.style.backgroundImage = 'url(/rain_50x54.png)';
      } else {
        el.style.backgroundImage = 'url(/sun_50x54.png)';
      }
      el.style.width = `7%`;
      el.style.height = `7%`;
    
      el.addEventListener('click', () => {
        onSelectCity(key);
      });
    
      new maplibregl.Marker({ element: el })
        .setLngLat([city.lon, city.lat])
        .addTo(map);
    });
    return () => {
      map.remove(); // Clean up the map when the component unmounts
    };
  }, [cities, onSelectCity]);

  return (
    <div id="map"></div>
  );
}

export default Map;

