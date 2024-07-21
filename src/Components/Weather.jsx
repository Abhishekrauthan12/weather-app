import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear from '../assets/rain_7922771.png';
import sky from '../assets/sky_16227679.png';
import rain from '../assets/slighrain.png';
import snow from '../assets/snowy_6566033.png';
import humidity from '../assets/humidity.png';
import sunny from '../assets/sunny.png';
import wind from '../assets/wind.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);

    const allIcons = {
        "01d": sunny,
        "01n": sunny,
        "02d": sky,
        "02n": sky, 
        "03d": sky,
        "03n": sky,
        "04d": rain,
        "04n": rain,
        "09d": clear,
        "09n": clear,
        "10d": clear,
        "10n": clear,
        "13d": snow,
        "13n": snow,
    };

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) {
                alert(data.message);
                return;
            }
            
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: allIcons[data.weather[0].icon] || sunny,
            });
        } catch (error) {
            setWeatherData(null);
            console.error("Error in Fetching Weather Data:", error);
        }
    };

    useEffect(() => {
        search("London");
    }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Search..." />
                <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity} alt="Humidity" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind} alt="Wind Speed" />
                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind-speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Weather;
