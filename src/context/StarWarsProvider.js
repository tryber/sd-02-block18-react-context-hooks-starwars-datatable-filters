import React, { useState } from 'react';
import swAPI from '../services/SWAPI';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const initialSelectors = ['coluna', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [selectors, setSelectors] = useState(initialSelectors);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredWord, setFilteredWord] = useState();

  const fetchPlanetsComplete = ({ results }) => {
    setData(results);
    setIsLoading(false);
  };

  const fetchPlanets = () => {
    swAPI()
      .then((response) => fetchPlanetsComplete(response));
  };

  const context = {
    selectors,
    data,
    fetchPlanets,
    isLoading,
    setFilteredWord,
    filteredWord,
  };

  return (
    <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>
  );
};

export default StarWarsProvider;
