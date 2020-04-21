import React from 'react';
import propTypes from 'prop-types';

import ApiProvider from './ApiProvider';
import FilterProvider from './FilterProvider';

const Provider = ({ children }) => (
  <ApiProvider>
    <FilterProvider>
      {children}
    </FilterProvider>
  </ApiProvider>
);

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
