import React, { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import Loader from "./Loader";
import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState({ loading: false, error: false });
  const [showForm, setShowForm] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const search = async (event) => {
    event.preventDefault();
    if (query) {
      setWeather({ ...weather, loading: true });
      const apiKey = "6ce7f3549e664a7d820114014240909";
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

      try {
        const res = await axios.get(url);
        const newCityWeather = res.data;
        const cityExists = cities.some(
          (city) => city.location.name === newCityWeather.location.name
        );
        if (!cityExists) {
          setCities([...cities, newCityWeather]);
        }
        setSelectedCity(newCityWeather);
        setWeather({ loading: false, error: false });
        setQuery("");
        setShowForm(false);
        setSuggestions([]);
        setSidebarVisible(false);
      } catch (error) {
        setWeather({ loading: false, error: true });
        console.log("Error fetching city weather:", error);
      }
    }
  };

  const removeCity = (cityName) => {
    const updatedCities = cities.filter(
      (city) => city.location.name !== cityName
    );
    setCities(updatedCities);
    if (selectedCity?.location.name === cityName) {
      setSelectedCity(null);
    }
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSidebarVisible(false);
  };

  const fetchSuggestions = async (searchTerm) => {
    const apiKey = "142e4f8053msh621deeb644e3a2ep1d9fc9jsn7a2f25d8f11a";
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchTerm}&limit=5&types=CITY`;
    const options = {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    try {
      const res = await axios.get(url, options);
      setSuggestions(res.data.data);
    } catch (error) {
      console.log("Error fetching city suggestions:", error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value.length >= 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (cityName) => {
    setQuery(cityName);
    setSuggestions([]);
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="App">
          <div className="hamburger-icon" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </div>

          <div className={`sidebar ${sidebarVisible ? "open" : ""}`}>
            <h2>Cities</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="add-city-button"
            >
              {showForm ? "Search" : "Add City"}
            </button>

            {showForm && (
              <div>
                <form onSubmit={search} className="add-city-form">
                  <input
                    type="text"
                    placeholder="Enter city name"
                    value={query}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit">Add</button>
                </form>

                {suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion.name)}
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <ul className="city-list">
              {cities.map((city) => (
                <li key={city.location.name}>
                  <span onClick={() => handleCityClick(city)}>
                    {city.location.name}
                  </span>
                  <button onClick={() => removeCity(city.location.name)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="weather-display">
            {weather.loading && <h4>Loading...</h4>}
            {weather.error && (
              <span className="error-message">
                City not found. Please try again.
              </span>
            )}
            {selectedCity && <Forecast weather={{ data: selectedCity }} />}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
