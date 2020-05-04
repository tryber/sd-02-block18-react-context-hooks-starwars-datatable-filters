import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const StarWarsContext = createContext();

export const filterAll = (name, results, column, comparison, value) => {
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
