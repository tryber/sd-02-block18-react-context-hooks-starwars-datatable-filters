import { useEffect, useContext } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';

export default function SWAPI() {
  const { data: [, setPlanetsData] } = useContext(PlanetsDBContext);

  useEffect(() => {
    const fetchPlanets = async () => {
      const URL = 'https://cors-anywhere.herokuapp.com/https://swapi-trybe.herokuapp.com/api/planets';

      const data = await fetch(URL)
        .then((response) => response.json())
        .then(({ results }) => results.flat());
      return setPlanetsData(data);
    };
    fetchPlanets();
  }, []);

  return null;
}
