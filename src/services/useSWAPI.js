import { useEffect, useContext } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';

export default function useSWAPI() {
  const {
    data: [planetsData, setPlanetsData],
    loading: [, setIsLoading],
  } = useContext(PlanetsDBContext);

  useEffect(() => {
    const fetchPlanets = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets';

      const data = await fetch(URL)
        .then((response) => response.json())
        .then(({ results }) => {
          setIsLoading(false);
          return [...results];
        })
        .catch((err) => {
          throw new Error(err);
        });
      return setPlanetsData(data);
    };
    fetchPlanets();

    return () => {
      setIsLoading(true);
      setPlanetsData([]);
    };
  }, [setPlanetsData, setIsLoading]);

  return planetsData;
}
