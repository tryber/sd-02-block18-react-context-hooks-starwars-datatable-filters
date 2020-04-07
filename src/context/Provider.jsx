import React, { useState } from 'react';
import getPlanets from '../services/planetsApi';
import starWarsContext from './StarWarsContext';

const Provider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([{ name: '' }]);


  const fetchSucess = ({ results }) => {
    setData(results);
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

  const filterName = (name) => {
    setFilters([{ name }]);
  };

  const context = {
    fetchPlanets,
    isFetching,
    error,
    data,
    filterName,
    filters,
  };

  return (
    <starWarsContext.Provider value={context}>{children}</starWarsContext.Provider>
  );
};

export default Provider;
