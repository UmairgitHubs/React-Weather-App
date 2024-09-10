import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = "6ce7f3549e664a7d820114014240909";
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${data.location.name}&days=5`;

      try {
        const response = await axios.get(url);
        setForecastData(response.data.forecast.forecastday);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [data.location.name]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    return isCelsius
      ? Math.round(temperature)
      : convertToFahrenheit(temperature);
  };

  return (
    <div className="forecast-card">
      <div className="city-name">
        <h2>
          {data.location.name}, <span>{data.location.country}</span>
        </h2>
      </div>
      <div className="temp">
        {data.current.condition.icon && (
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
            className="temp-icon"
          />
        )}
        {renderTemperature(data.current.temp_c)}°{isCelsius ? "C" : "F"}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">{data.current.condition.text}</p>

      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData &&
            forecastData.map((day) => (
              <div className="day" key={day.date_epoch}>
                <p className="day-name">{formatDay(day.date_epoch)}</p>
                {day.day.condition.icon && (
                  <img
                    className="day-icon"
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                  />
                )}
                <p className="day-temperature">
                  {Math.round(day.day.mintemp_c)}° /{" "}
                  {Math.round(day.day.maxtemp_c)}°
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
