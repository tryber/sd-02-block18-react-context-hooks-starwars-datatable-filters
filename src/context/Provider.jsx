import React, { useState } from 'react';
import getPlanets from '../services/planetsApi';
import starWarsContext from './StarWarsContext';

const Provider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [planets, setPlanets] = useState([]);


  const fetchSucess = ({ results }) => {
    setPlanets(results);
    setIsFetching(true);
  };

  const fetchFail = (receiveError) => {
    setError(receiveError);
    setIsFetching(true);
  };

  const fetchPlanets = () => {
    getPlanets()
      .then(fetchSucess, fetchFail);
  };

  const context = {
    fetchPlanets,
    isFetching,
    error,
    planets,
  };

  return (
    <starWarsContext.Provider value={context}>{children}</starWarsContext.Provider>
  );
};

export default Provider;
