import Header from "./header/Header";
import { WeatherProvider } from "./provider";
import WeatherBoard from "./weather/WeatherBoard";

export default function App() {
  return (
    <WeatherProvider>
      <div className="grid place-items-center h-screen">
        <Header />
        <main>
          <section>
            <WeatherBoard />
          </section>
        </main>
      </div>
    </WeatherProvider>
  );
}
