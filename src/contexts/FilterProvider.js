import React from 'react';
import propTypes from 'prop-types';

import FilterContext from './FilterContext';
import useFilter from '../customHooks/useFilter';

const FilterProvider = ({ children }) => {
  const filterContext = useFilter();
  return (
    <FilterContext value={filterContext}>
      {children}
    </FilterContext>
  );
};

FilterProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default FilterProvider;
