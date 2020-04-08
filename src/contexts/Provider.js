import React from 'react';
import propTypes from 'prop-types';

import useFetch from '../customHooks/useFetch';
import useFilter from '../customHooks/useFilter';
import ApiContext from './ApiContext';
import FilterContext from './FilterContext';

const Provider = ({ children }) => {
  const apiContext = useFetch(true);
  const filterContext = useFilter();
  return (
    <ApiContext.Provider value={apiContext}>
      <FilterContext.Provider value={filterContext}>
        {children}
      </FilterContext.Provider>
    </ApiContext.Provider>
  );
};

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
