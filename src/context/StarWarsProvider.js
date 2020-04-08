import React, { useState } from 'react';
import PropTypes from 'prop-types';
import swAPI from '../services/SWAPI';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const initialSelectors = ['coluna', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [selectors, setSelectors] = useState(initialSelectors);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialFilters = {
    filters: [
      {
        name: '',
      },
      {
        numericValues: {
          column: 'coluna',
          comparison: '-',
          valueComparison: 0,
        },
      },
    ],
  };

  const [filters, setFilters] = useState(initialFilters);

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
    setSelectors,
    data,
    fetchPlanets,
    isLoading,
    filters,
    setFilters,
  };

  return (
    <StarWarsContext.Provider value={context}> {children}</StarWarsContext.Provider>
  );
};

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
