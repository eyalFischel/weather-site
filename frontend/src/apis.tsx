const getCities = async () => {
  try {
    const response = await fetch('http://localhost:8000/weather', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return []; // Return an empty array or handle the error as needed
  }
};
const handleRefresh = async () => {
      try {
        const response = await fetch('http://localhost:8000/weather/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        console.log('Success:', data);
        return data;
      } catch (error) {
        console.error('Error:', error);
        return []; // Return an empty array or handle the error as needed
      }
  }

  
  const addCity = async  (city: string) : Promise<string[]> =>{
    try {
      const response = await fetch('http://localhost:8000/weather/add', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city: city }),
    })
      const data = await response.json();
      console.log('Success:', data, typeof data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return []; // Return an empty array or handle the error as needed
    }
  }

export { getCities, handleRefresh, addCity };