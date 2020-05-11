import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StarWarsContext = createContext();

export const filterAll = (name, results, numericValues = {}) => {
  const { column, comparison, value } = numericValues;
  const filtered = name
    ? results.filter((planet) => planet.name.toLowerCase().match(name))
    : results;
  switch (comparison) {
    case 'Maior que':
      return filtered.filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
    case 'Menor que':
      return filtered.filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
    case 'Igual a':
      return filtered.filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
    default: return filtered;
  }
};

export const StarWarsProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState([{ name: input }]);
  const [numericFilter, setNumericFilter] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  const [, ...rest] = filters;
  const filterByName = (name) => {
    let filteredResults = data;
    if (rest.length) {
      rest.forEach(({ numericValues }) => {
        filteredResults = filterAll(name, filteredResults, numericValues);
      });
    } else {
      filteredResults = filterAll(name, filteredResults);
    }
    setFilteredData(filteredResults);
    setFilters([{ name }, ...rest]);
  };

  useEffect(() => {
    filterByName(input);
  }, [input, rest.length]);


  const context = {
    input,
    setInput,
    filters,
    data,
    setData,
    filteredData,
    setFilteredData,
    setFilters,
    numericFilter,
    setNumericFilter,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
