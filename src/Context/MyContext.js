import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwPlanetsRequest from '../Services';
import SwContext from './index';

const MyContext = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [errorRequest, setErrorRequest] = useState('');


  const successPlanets = (data) => {
    setPlanets(data);
    setIsFetching(false);
  };

  const failedPlanets = ({ message }) => {
    setErrorRequest(message);
  };

  useEffect(() => {
    SwPlanetsRequest()
      .then(successPlanets, failedPlanets);
  }, []);

  const toContext = {
    isFetching,
    setIsFetching,
    planets,
    errorRequest,
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
