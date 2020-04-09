import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';

import useFilter from '../customHooks/useFilter';
import FilterContext from './FilterContext';
import ApiContext from './ApiContext';
import FunctionContext from './FunctionContext';

const filterByName = (planets, name, setFilterPlanets) => {
  const filterPlanets = planets.filter((planet) => planet.name.match(new RegExp(name, 'i')));
  setFilterPlanets(filterPlanets);
};

const FilterProvider = ({ children }) => {
  const { planets } = useContext(ApiContext);
  const {
    setName, setFilterPlanets, filterPlanets, filters,
  } = useFilter(planets);

  const { name } = filters[0];

  useEffect(() => {
    filterByName(planets, name, setFilterPlanets);
  }, [name]);

  const filterContext = {
    filterPlanets: [...filterPlanets],
    filters: [...filters],
  };

  const functionContext = {
    setName,
    setFilterPlanets,
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
