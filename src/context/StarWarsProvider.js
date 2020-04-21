import React, { useState } from 'react';
import PropTypes from 'prop-types';
import swAPI from '../services/SWAPI';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const initialSelectors = ['coluna', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [selectors, setSelectors] = useState(initialSelectors);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialFilters = [{ name: '' }];
  const initialActualFilter = {
    column: 'coluna',
    comparison: '-',
    value: 0,
  };

  const [filters, setFilters] = useState(initialFilters);
  const [actualFilter, setActualFilter] = useState(initialActualFilter);

  const fetchPlanetsComplete = ({ results }) => {
    setData(results);
    setIsLoading(false);
  };

  const fetchPlanets = () => {
    swAPI()
      .then((response) => fetchPlanetsComplete(response));
  };

  const addNewFilter = (column, comparison, value) => {
    setSelectors((prevSelectors) => [
      ...prevSelectors.filter((elem) => elem !== column),
    ]);
    setFilters((prevfilters) => [...prevfilters, {
      numericValues: {
        column,
        comparison,
        value,
      },
    }]);
    setActualFilter(initialActualFilter);
  };

  const addFilter = () => {
    const { column, comparison, value } = actualFilter;
    if ((column !== 'coluna' && comparison !== '-' && value >= 0)) {
      addNewFilter(column, comparison, value);
    } else alert('Escolha os três campos');
  };

  const context = {
    selectors,
    setSelectors,
    data,
    fetchPlanets,
    isLoading,
    filters,
    setFilters,
    actualFilter,
    setActualFilter,
    addFilter,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
