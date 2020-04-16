import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsProvider';

const SearchBar = () => {
  const { setName } = useContext(PlanetsContext);
  return (
    <div className="group search-bar">
      <input onChange={({ target: { value } }) => setName(value)} id="search-bar" required />
      <span className="highlight" />
      <span className="bar" />
      <label htmlFor="search-bar">Search by planet name</label>
    </div>
  );
};

export default SearchBar;
