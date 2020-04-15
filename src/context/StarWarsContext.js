import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { planetsData } from '../swapiFetch';

const StarWarsContext = createContext();

const PlanetsProvider = ({ children }) => {
  const [planetData, setData] = useState({ data: [], isFetching: true });
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilterObj, setFilterObj] = useState({ column: '', comparison: '', value: '' });
  const [numericFilters, setFilters] = useState([]);
  const [sortColumn, setSort] = useState({ column: 'name', order: 'ASC' });

  const fetchPlanets = () => {
    if (!planetData.isFetching) return;
    planetsData()
      .then((data) => {
        setData({ data: data.results, isFetching: false });
      });
  };

  const setNumericFilters = (numericFilter) => {
    setFilters([...numericFilters, numericFilter]);
  };

  const removeNumericFilter = (numericFilter) => {
    setFilters([...numericFilters.filter((filter) => filter !== numericFilter)]);
  };

  const context = {
    planetData,
    setData,
    nameFilter,
    setNameFilter,
    numericFilterObj,
    setFilterObj,
    numericFilters,
    setNumericFilters,
    removeNumericFilter,
    sortColumn,
    setSort,
    fetchPlanets,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

export { StarWarsContext, PlanetsProvider as Provider };

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsContext;
