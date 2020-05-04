import React, { useContext, useEffect } from 'react';
import './SearchBar.css';
import { StarWarsContext, filterAll } from '../context/StarWarsContext';

const SearchBar = () => {
  const {
    input, setInput, data, filters, setFilters, setFilteredData,
  } = useContext(StarWarsContext);

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

  useEffect(() => {
    filterByName(input, data, filters);
    // const [, ...rest] = filters;
    // setFilters([{ name: input, ...rest }]);
  }, [input]);

  return (
    <div className="group search-bar">
      <input onChange={({ target: { value } }) => setInput(value)} id="search-bar" required />
      <span className="highlight" />
      <span className="bar" />
      <label htmlFor="search-bar">Search by planet name</label>
    </div>
  );
};

export default SearchBar;
