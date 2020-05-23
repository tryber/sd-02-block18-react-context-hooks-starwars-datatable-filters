import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwPlanetsRequest from '../Services';
import SwContext from './index';

const arrayColumns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const MyContext = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [errorRequest, setErrorRequest] = useState('');
  const [planetsToFilter, setPlanetsToFilter] = useState([]);
  const [userInputName, setUserInputName] = useState('');
  const [filters, setFilters] = useState([]);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [columns, setColumns] = useState(arrayColumns);
  const [sortFilters, setSortFilters] = useState({ column: 'name', order: 'ASC' });

  const successPlanets = (data) => {
    setPlanets(data.results);
    setPlanetsToFilter(data.results);
    setIsFetching(false);
  };

  const failedPlanets = ({ message }) => {
    setErrorRequest(message);
    alert(message);
  };

  useEffect(() => {
    const filteredName = planets.filter((planet) => {
      const apiPlanet = planet.name.toLowerCase();
      return apiPlanet.includes(userInputName.toLowerCase());
    });
    setPlanetsToFilter(filteredName);
  }, [userInputName]);

  useEffect(() => {
    SwPlanetsRequest()
      .then(successPlanets, failedPlanets);
  }, []);

  const toContext = {
    isFetching,
    setIsFetching,
    planets,
    errorRequest,
    planetsToFilter,
    setPlanetsToFilter,
    userInputName,
    setUserInputName,
    filters,
    setFilters,
    column,
    setColumn,
    comparison,
    setComparison,
    columns,
    setColumns,
    sortFilters,
    setSortFilters,
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
