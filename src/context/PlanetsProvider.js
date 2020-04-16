import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchPlanets';

export const PlanetsContext = createContext();

const PlanetsProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchPlanets().then((results) => {
      setPlanets(results);
      setIsFetching(false);
    });
  }, []);

  const filteredPlanets = planets
    .filter((planet) => planet.name.toLowerCase().match(name)) || [];

  const context = {
    isFetching,
    planets,
    filteredPlanets,
    setName,
    filters: [
      { name },
    ],
  };

  return (
    <PlanetsContext.Provider value={context}>
      {children}
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
