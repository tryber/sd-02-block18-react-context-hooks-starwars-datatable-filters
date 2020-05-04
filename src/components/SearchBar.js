import React, { useContext, useEffect } from 'react';
import './SearchBar.css';
import { StarWarsContext } from '../context/StarWarsContext';

const SearchBar = () => {
  const { input, setInput, data, filters, filterByName } = useContext(StarWarsContext);
  // const { filters: allFilters } = filters;

  useEffect(() => {
    filterByName(input, data, filters);
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
