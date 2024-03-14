import Person from "./Person";
import Weather from "./WeatherAPI/Weather";
import CityToCoordinates from "./WeatherAPI/CityToCoordinates/CityToCoordinates";

import "./App.css";

function App() {
  return (
    <>
      {/* <Person /> */}
      <CityToCoordinates />
      <Weather />
    </>
  );
}

export default App;
