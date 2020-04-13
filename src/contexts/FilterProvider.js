import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';

import useFilter from '../customHooks/useFilter';
import FilterContext from './FilterContext';
import ApiContext from './ApiContext';
import FunctionContext from './FunctionContext';

const filterByNumericValues = (filterPlanet, comparison, column, value) => {
  switch (comparison) {
    case 'maior que':
      return filterPlanet.filter((planet) => Number(planet[column]) > Number(value));
    case 'menor que':
      return filterPlanet.filter((planet) => Number(planet[column]) < Number(value));
    default:
      return filterPlanet.filter((planet) => Number(planet[column]) === Number(value));
  }
};

const filterArray = (planets, filters, setFilterPlanets) => {
  const filterPlanets = filters.reduce((acc, cur) => {
    const {
      name, column, comparison, value,
    } = cur;
    let filterPlanet = acc;
    if (name) {
      filterPlanet = filterPlanet.filter((planet) => planet.name.match(new RegExp(name, 'i')));
    }
    if (value) {
      filterPlanet = filterByNumericValues(filterPlanet, comparison, column, value);
    }
    return filterPlanet;
  }, planets);

  setFilterPlanets([...filterPlanets]);
};

const removeFilter = (filter, filters, setNumericValues) => {
  const newFilters = filters;
  const removeIndex = newFilters.findIndex(({ column }) => filter === column);
  newFilters.splice(removeIndex, 1);
  setNumericValues(newFilters);
};

const FilterProvider = ({ children }) => {
  const { planets } = useContext(ApiContext);
  const {
    setName, setNumericValues, setFilterPlanets, filterPlanets, filters,
  } = useFilter(planets);

  const [{ name }, ...rest] = filters;


  useEffect(() => {
    filterArray(planets, filters, setFilterPlanets);
  }, [name, rest.length]);

  const filterContext = {
    filterPlanets: [...filterPlanets],
    filters,
  };

  const functionContext = {
    setName,
    setNumericValues,
    setFilterPlanets,
    removeFilter,
  };

  return (
    <FilterContext.Provider value={filterContext}>
      <FunctionContext.Provider value={functionContext}>
        {children}
      </FunctionContext.Provider>
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default FilterProvider;
