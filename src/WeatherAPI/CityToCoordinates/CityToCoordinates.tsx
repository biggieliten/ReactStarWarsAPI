import { useEffect, useRef, useState } from "react";
// ("&x-api-key=B1LopcpgEYyjAiroyKoSHQ==3NFSM4ON6zI3JuWS");
const apiURL = "https://api.api-ninjas.com/v1/geocoding?";
const apiKey = "B1LopcpgEYyjAiroyKoSHQ==3NFSM4ON6zI3JuWS";

type CoordinatesType = {
  latitude: number;
  longitude: number;
};

const CityToCoordinates = () => {
  const [coordinates, setCoordinates] = useState({} as CoordinatesType);
  //   const [latitide, setLatitude] = useState("" as CoordinatesType);
  const [url, setUrl] = useState("");
  const cityRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (url) {
        const result = await fetch(url);
        const data = await result.json();

        if (!ignore) {
          setCoordinates({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
          });
        }
      }
    };
    let ignore = false;
    fetchCoordinates();
    return () => {
      ignore = true;
    };
    // if (url) {
    //   fetchCoordinates();
    // }
  }, [url]);

  return (
    <>
      <div>
        <label htmlFor="city">City </label>
        <input type="text" name="city" ref={cityRef} />
        <label htmlFor="country">Country </label>
        <input type="text" name="country" ref={countryRef} />
        <button
          onClick={() => {
            setUrl(
              `${apiURL}city=${cityRef.current?.value}&country=${countryRef.current?.value}&x-api-key=${apiKey}`
            );

            // console.log(coordinates.latitude, coordinates.longitude);
          }}
        >
          Run
        </button>
        <p>
          {coordinates.latitude && coordinates.longitude
            ? `Longitude: ${coordinates.longitude} Latitude: ${coordinates.latitude}`
            : "Loading..."}
        </p>
      </div>
    </>
  );
};

export default CityToCoordinates;
