import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/filterButton.css';

function FilterButton() {
  const { addFilter } = useContext(StarWarsContext);
  return (
    <div>
      <button
        type="button"
        onClick={() => addFilter()}
        className="filter-btn"
        data-testid="btn-filter"
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterButton;
