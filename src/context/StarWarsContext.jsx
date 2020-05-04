import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StarWarsContext = createContext();

export const StarWarsProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState([{ name: input }]);

  const filterAll = (name, results, column, comparison, value) => {
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

  const filterByName = (name, results, allFilters) => {
    const [, ...rest] = allFilters;
    let filteredResults = results;
    if (rest.length) {
      rest.forEach(({
        numericValues: {
          column,
          comparison,
          value,
        },
      }) => {
        filteredResults = filterAll(name, filteredResults, column, comparison, value);
      });
    } else {
      filteredResults = filterAll(name, results);
    }
    setFilteredData(filteredResults);
    setFilters([{ name }, ...rest]);
  };

  const filterByColumn = (
    name, results, column, comparison, value, allFilters, filteredPlanets,
  ) => {
    const [, ...rest] = allFilters;
    let filteredResults = [];
    if (rest.length) {
      filteredResults = filterAll(name, filteredPlanets, column, comparison, value);
    } else {
      filteredResults = filterAll(name, results, column, comparison, value);
    }
    setFilteredData(filteredResults);
    setFilters([
      ...filters,
      {
        numericValues: {
          column,
          comparison,
          value,
        },
      },
    ]);
  };

  const context = {
    input,
    setInput,
    filters,
    data,
    setData,
    filteredData,
    filterByName,
    filterByColumn,
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
