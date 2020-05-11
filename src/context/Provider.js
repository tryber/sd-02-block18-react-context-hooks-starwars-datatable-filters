import React from 'react';
import PropTypes from 'prop-types';

import FilterProvider from './FilterProvider';

const Provider = ({ children }) => (
  <FilterProvider>
    {children}
  </FilterProvider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
