import { useEffect, useState, useRef } from "react";

const apiURL = "https://api.open-meteo.com/v1/forecast?";

type WeatherType = {
  longitude: string;
  latitude: string;
  temperature: string;
};

const Weather = () => {
  //   const [longitude, setLongitude] = useState("");
  //   const [latitude, setLatitude] = useState("");
  const longitudeRef = useRef<HTMLInputElement>(null);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(url);
      const data = await result.json();

      setWeather({
        longitude: data.longitude,
        latitude: data.latitude,
        temperature: data.current.temperature_2m,
      });
    };
    if (url) {
      fetchData();
    }
  }, [url]);

  return (
    <>
      <div>
        <label htmlFor="long">Longitude </label>
        <input type="text" name="long" ref={longitudeRef} />
        <br />
        <label htmlFor="lat">Latitude </label>
        <input type="text" name="lat" ref={latitudeRef} />
        <button
          onClick={() =>
            setUrl(
              `${apiURL}latitude=${latitudeRef.current?.value}&longitude=${longitudeRef.current?.value}&current=temperature_2m`
            )
          }
        >
          Run
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
