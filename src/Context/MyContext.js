import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwContext from './index';

const MyContext = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);

  const toContext = {
    isFetching,
    setIsFetching,
  };

  return (
    <SwContext.Provider value={toContext}>
      {children}
    </SwContext.Provider>
  );
};

export default MyContext;

MyContext.propTypes = {
  children: PropTypes.node.isRequired,
};
