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

function sortPlanets(filteredResults, column, order) {
  const sortedPlanets = filteredResults.sort((a, b) => a[column] - b[column]
    || a[column].toString().localeCompare(b[column].toString()));
  if (order === 'DESC') return sortedPlanets.reverse();
  return sortedPlanets;
}

export const StarWarsProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState([
    { name: input },
  ]);
  const [numericFilter, setNumericFilter] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  const [sortColumns, setSortColumns] = useState({ column: 'name', order: 'ASC' });

  const [, ...rest] = filters;
  const filterByName = () => {
    let filteredResults = data;
    if (rest.length) {
      rest.forEach(({ numericValues }) => {
        filteredResults = filterAll(input, filteredResults, numericValues);
      });
    } else {
      filteredResults = filterAll(input, filteredResults);
    }
    const { column, order } = sortColumns;
    filteredResults = sortPlanets(filteredResults, column, order);
    setFilteredData(filteredResults);
    setFilters([{ name: input }, ...rest]);
  };

  useEffect(() => {
    filterByName();
  }, [input, rest.length, sortColumns]);

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
    sortColumns,
    setSortColumns,
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
