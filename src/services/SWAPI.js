import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { PlanetsDBContext } from '../context/PlanetsDBContext';

export default function SWAPI() {
  const { data } = useContext(PlanetsDBContext);

  useEffect(() => {
    const URL = 'https://cors-anywhere.herokuapp.com/https://swapi.co/api/planets/';

    fetch(URL)
      .then((response) => response.json())
      .then(({ results }) => data.setPlanetsData(results.flat()));
  }, [data.planetsData]);
}

SWAPI.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
