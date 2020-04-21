import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/planetsApi';
import starWarsContext from './StarWarsContext';

const sortArray = ({ column, order }, array) => {
  const arrayNumberSort = ['rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population'];
  if (!arrayNumberSort.includes(column)) {
    return ((order === 'ASC')
      ? (array.sort((a, b) => ((a[column]) < (b[column]) ? -1 : 1)))
      : (array.sort((a, b) => ((a[column] < b[column]) ? 1 : -1))));
  }
  return ((order === 'ASC')
    ? (array.sort((a, b) => (Number(a[column]) < Number(b[column]) ? 1 : -1)))
    : (array.sort((a, b) => (Number(a[column]) < Number(b[column]) ? -1 : 1))));
};

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

const Provider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([{
    name: '',
    column: 'name',
    order: 'ASC',
  }]);
  const [filtredPlanets, setFiltredPlanets] = useState([]);


  useEffect(() => {
    const nameMatch = (name) => name.match(new RegExp(filters[0].name, 'i'));
    let filtred = [...data];
    filters.forEach((filter) => {
      filtred = switchFunction(filter, filtred);
    });
    const newArray = filtred.filter(({ name }) => nameMatch(name));
    const arraySorted = (filtred.length > 0) ? (sortArray(filters[0], newArray)) : [];
    setFiltredPlanets(arraySorted);
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

  const filtersAscDesc = (target) => {
    const [param, ...rest] = filters;
    param.column = target;
    param.order = (param.order === 'ASC') ? 'DESC' : 'ASC';
    setFilters([{ ...param }, ...rest]);
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
    const { name, column, order } = filters[0];
    const removeFilter = filters.filter(({ numericValues: { column: col } }) => (
      col !== excludeClick));
    removeFilter[0] = {
      name, column, order, ...removeFilter[0],
    };
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
    filtersAscDesc,
  };
  return (
    <starWarsContext.Provider value={context}>{children}</starWarsContext.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
