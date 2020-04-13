import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/planetsApi';
import starWarsContext from './StarWarsContext';

const Provider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([{
    name: '',
    column: 'diameter',
    order: 'ASC',
  }]);
  const [filtredPlanets, setFiltredPlanets] = useState([]);

  const switchFunction = ({ numericValues = {} }, filtred) => {
    const { column = '', value, comparison = '' } = numericValues;
    switch (comparison) {
      case 'menor que': {
        return (filtred
          .filter((planet) => Number(planet[column]) < Number(value)));
      }
      case 'maior que': {
        return (filtred
          .filter((planet) => Number(planet[column]) > Number(value)));
      }
      case 'igual a': {
        return (filtred
          .filter((planet) => Number(planet[column]) === Number(value)));
      }
      default: return filtred;
    }
  };

  const sortArray = ({ column, order }, array) => {
    return (order === 'ASC') ? (array.sort((a, b) => ((
      (typeof a[column] === 'number')
        ? Number(a[column]) < Number(b[column]) ? -1 : 1
        : (a[column]) < (b[column]) ? -1 : 1))))
      : array.sort((a, b) => ((a[column] < b[column]) ? 1 : -1));
  };

  useEffect(() => {
    const nameMatch = (name) => name.match(new RegExp(filters[0].name, 'i'));
    let filtred = [...data];
    filters.forEach((filter) => {
      filtred = switchFunction(filter, filtred);
    });
    const newArray = filtred.filter(({ name }) => nameMatch(name));
    setFiltredPlanets(sortArray(filters[0], newArray));
  }, [filters, data]);


  const fetchSucess = ({ results }) => {
    setData(results);
    setFiltredPlanets(results);
    setIsFetching(true);
  };

  const fetchFail = (Error) => {
    setError(Error.message);
    setIsFetching(true);
  };

  const fetchPlanets = () => {
    getPlanets()
      .then(fetchSucess, fetchFail);
  };

  const filterName = (name) => {
    const [param, ...rest] = filters;
    param.name = name;
    setFilters([{ ...param }, ...rest]);
  };

  const addFilter = (column, comparison, value) => {
    setFilters((filters[0].numericValues !== undefined)
      ? [...filters, { numericValues: { column, comparison, value } }]
      : [{ ...filters[0], numericValues: { column, comparison, value } }]);
  };

  const excludeFilter = (excludeClick) => {
    const { name } = filters[0];
    const removeFilter = filters.filter(({ numericValues: { column } }) => column !== excludeClick);
    removeFilter[0] = { name, ...removeFilter[0] };
    setFilters(removeFilter);
  };

  const context = {
    fetchPlanets,
    isFetching,
    error,
    data,
    filterName,
    filtredPlanets,
    addFilter,
    filters,
    excludeFilter,
  };
  return (
    <starWarsContext.Provider value={context}>{children}</starWarsContext.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
