import { useEffect, useState } from "react";

const url = "https://swapi.py4e.com/api/people/1";

type SWperson = {
  name: string;
  eye_color: string;
  birth_year: string;
};

const Person = () => {
  const [name, setName] = useState("");
  const [person, setPerson] = useState({} as SWperson);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(url);
      const data = await result.json();
      //   return data.name;
      if (!ignore) {
        setPerson({
          name: data.name,
          eye_color: data.eye_color,
          birth_year: data.birth_year,
        });
      }
    };
    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <p>
        {person
          ? ` Name: ${person.name}, Eye color: ${person.eye_color},
	   Birth year: ${person.birth_year}`
          : "Loading..."}
      </p>
    </>
  );
};

export default Person;
