import React from 'react';
import propTypes from 'prop-types';

import useFetch from '../customHooks/useFetch';
import ApiContext from './ApiContext';

const removeResidents = (planets) => {
  const newPlanets = planets.filter((planet) => {
    const copyPlanet = planet;
    return delete copyPlanet.residents;
  });

  return newPlanets;
};

const ApiProvider = ({ children }) => {
  const { planets, isFetching, error } = useFetch(true);
  const planetsWithoutResidents = removeResidents(planets || []);

  const apiContext = {
    planets: planetsWithoutResidents,
    isFetching,
    error,
  };

  return (
    <ApiContext.Provider value={apiContext}>
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default ApiProvider;
