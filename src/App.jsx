import React, { useState, useEffect } from 'react';
import './App.css';

const url = 'http://api.weatherapi.com/v1/current.json?key=18f1365f24604e94af480935231908&q=Georgia&aqi=no';
const pollingInterval = 60000; // 60 seconds

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const weatherData = await response.json();
        setWeather(weatherData);
        setIsLoading(false);
        console.log(weatherData);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, pollingInterval);

    fetchData(); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ border: '2px solid gray', borderRadius: '15px', padding: '15px' }}>
          <img
            src={weather.current.condition.icon}
            alt={weather.location.name}
            style={{ width: '10rem', height: '10rem', border: '1px solid gray', borderRadius: '4px' }}
          />
          <h1>{weather.location.name}</h1>
          <p>Country: {weather.location.country}</p>
          <p>Weather: {weather.current.condition.text}</p>
          <p>Temperature: {weather.current.temp_c}</p>
        </div>
      )}
    </div>
  );
}

export default App;
