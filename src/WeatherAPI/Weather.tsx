import { useEffect, useState, useRef } from "react";
import CityToCoordinates from "./CityToCoordinates/CityToCoordinates";

const apiURL = "https://api.open-meteo.com/v1/forecast?";
// const apiURL = "https://api.open-meteo.com/v1/forecast?";

//
type WeatherType = {
  longitude: string;
  latitude: string;
  temperature: string;
};

const Weather = () => {
  const longitudeRef = useRef<HTMLInputElement>(null);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [url, setUrl] = useState("");

  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  const handleCoordinates = ({ activeCoordinates }: any) => {
    setCoordinates(activeCoordinates);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(url);
      const data = await result.json();

      if (!ignore) {
        setWeather({
          longitude: data.longitude,
          latitude: data.latitude,
          temperature: data.current.temperature_2m,
        });
      }
    };
    let ignore = false;
    fetchData();
    console.log("weather", coordinates);
    return () => {
      ignore = true;
    };
  }, [url]);

  return (
    <>
      <CityToCoordinates onCoordinatesChange={handleCoordinates} />
      <div>
        <label htmlFor="long">Longitude </label>
        <input type="text" name="long" ref={longitudeRef} />
        <br />
        <label htmlFor="lat">Latitude </label>
        <input type="text" name="lat" ref={latitudeRef} />
        <button
          onClick={() =>
            setUrl(
              `${apiURL}latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m`
            )
          }
        >
          Search
        </button>
      </div>

      <p>
        {weather
          ? `Longitude: ${weather.longitude}, Latitude: ${weather.latitude}, Temperature: ${weather.temperature}  `
          : "Enter coordinates"}
      </p>
    </>
  );
};

export default Weather;
