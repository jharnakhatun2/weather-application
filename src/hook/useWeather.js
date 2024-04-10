import { useEffect, useState } from "react";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    longitude: "",
    latitude: "",
  });
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [error, setError] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading({
        ...loading,
        state: true,
        message: `Fetching weather data ...`,
      });

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl);

      // error handling if data not get
      if (!response.ok) {
        const errorMessage = `Fetching weather data failed : ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // we need specific data from json api
      const updateData = {
        ...weatherData,
        location: data?.name,
        climate: data?.weather[0]?.main,
        temperature: data?.main?.temp,
        maxTemperature: data?.main?.temp_max,
        minTemperature: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        cloudPercentage: data?.clouds?.all,
        wind: data?.wind?.speed,
        time: data?.dt,
        longitude: longitude,
        latitude: latitude,
      };
      setWeatherData(updateData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading({
        ...loading,
        state: false,
        message: "",
      });
    }
  };

  //call fetchWeatherData
  useEffect(() => {
    setLoading({
      ...loading,
      state: true,
      message: "Finding location...",
    });
    navigator.geolocation.getCurrentPosition(function (position) {
      fetchWeatherData(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  //return from weather hook
  return {
    weatherData,
    loading,
    error,
  };
};
export default useWeather;
