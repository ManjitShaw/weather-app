import React, { useRef, useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiHumidity,
} from "react-icons/wi";

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcon = {
    "01d": <WiDaySunny />,
    "01n": <WiNightClear />,
    "02d": <WiDayCloudy />,
    "02n": <WiNightAltCloudy />,
    "03d": <WiCloud />,
    "03n": <WiCloud />,
    "04d": <WiCloudy />,
    "04n": <WiCloudy />,
    "09d": <WiShowers />,
    "09n": <WiShowers />,
    "10d": <WiRain />,
    "10n": <WiRain />,
    "11d": <WiThunderstorm />,
    "11n": <WiThunderstorm />,
    "13d": <WiSnow />,
    "13n": <WiSnow />,
    "50d": <WiFog />,
    "50n": <WiFog />,
  };

  const iconColor = {
    "01d": "text-yellow-400",
    "01n": "text-blue-300",
    "02d": "text-yellow-300",
    "02n": "text-indigo-200",
    "03d": "text-slate-300",
    "03n": "text-slate-400",
    "04d": "text-gray-400",
    "04n": "text-gray-500",
    "09d": "text-blue-300",
    "09n": "text-blue-400",
    "10d": "text-cyan-400",
    "10n": "text-cyan-300",
    "11d": "text-purple-500",
    "11n": "text-purple-600",
    "13d": "text-white",
    "13n": "text-slate-200",
    "50d": "text-gray-200",
    "50n": "text-gray-300",
  };

  const search = async (city) => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }
    setWeatherData(null);
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert("City not found");
        setWeatherData(false);
        return;
      }

      const icon = allIcon[data.weather[0].icon] || <WiDaySunny />;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon,
        iconCode: data.weather[0].icon,
      });
    } catch (err) {
      alert("Something went wrong while fetching weather.");
      console.error(err);
      setWeatherData(false);
    }
  };

  // ========== JSX return =============

  if (weatherData === null) {
    return <div className="text-white text-center p-6">Loading...</div>;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-[350px]">
      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <input
          ref={inputRef}
          className="flex-grow h-12 rounded-xl px-4 bg-white/20 text-black placeholder-gray-300 
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 
            focus:ring-offset-slate-800 shadow-inner transition duration-200"
          type="text"
          placeholder="Enter a city"
        />
        <button
          onClick={() => search(inputRef.current.value)}
          className="bg-white/80 hover:bg-white text-black font-semibold px-4 py-2 rounded-xl shadow-md transition duration-200"
        >
          <FaSearch className="text-xl" />
        </button>
      </div>

      {/* If no data yet */}
      {weatherData === false ? (
        <div className="text-white text-center">
          Please enter a city name and click search
        </div>
      ) : (
        <>
          {/* Weather Icon */}
          <div className="flex justify-center">
            <div
              className={`text-[120px] ${
                iconColor[weatherData.iconCode] || "text-white"
              }`}
            >
              {weatherData.icon}
            </div>
          </div>

          {/* Location */}
          <div className="text-center mt-6 text-2xl font-semibold tracking-wide">
            <p>{weatherData.location}</p>
          </div>

          {/* Temperature */}
          <div className="text-center mt-2 text-4xl font-bold">
            <p>{weatherData.temperature}&deg;C</p>
          </div>

          {/* Weather Details */}
          <div className="w-full mt-10 flex justify-between">
            <div>
              <WiHumidity className="text-5xl" />
            </div>
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
            <div>
              <FaWind className="text-4xl" />
            </div>
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
