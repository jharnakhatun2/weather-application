import { WeatherContext } from "../context";
import useWeather from "../hook/useWeather";

const WeatherProvider = ({ children }) => {
  const { weatherData, loading, error } = useWeather();
  return (
    <WeatherContext.Provider value={{ weatherData, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider };
