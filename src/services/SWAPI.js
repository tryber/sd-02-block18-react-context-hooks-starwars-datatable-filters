import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { PlanetsDBContext } from '../context/PlanetsDBContext';

export default function SWAPI() {
  const { data: [planetsData, setPlanetsData] } = useContext(PlanetsDBContext);

  useEffect(() => {
    const fetchPlanets = async () => {
      const URL = 'https://cors-anywhere.herokuapp.com/https://swapi.co/api/planets/';

      const data = await fetch(URL)
        .then((response) => response.json())
        .then(({ results }) => results.flat());
      setPlanetsData(data);
    };
    fetchPlanets();
  }, []);
}

SWAPI.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
