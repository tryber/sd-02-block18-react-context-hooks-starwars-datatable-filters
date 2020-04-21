import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/listFilters.css';

const deleteFilter = (e, setSelectors, setFilters) => {
  const { id, value } = e.target;
  setSelectors((prevSelector) => [...prevSelector, value]);
  setFilters((prevSelector) => ([
    ...prevSelector.filter((elem, index) => index !== parseInt(id, 10)),
  ]));
};

const renderFiltersActive = (filters, setSelectors, setFilters) => {
  const cpFilters = [...filters];
  cpFilters.splice(0, 1);
  return (
    <div className="active-filters-container">
      {cpFilters.map((filtro, index) => (
        <div key={filtro.numericValues.column} className="active-filters">
          <button
            data-testid={`delete-${filtro.numericValues.column}`}
            type="button"
            onClick={(e) => deleteFilter(e, setSelectors, setFilters)}
            id={index + 1}
            value={filtro.numericValues.column}
          > X </button>
          <div className="filter-description-container">
            <div className="filter-description">
              {filtro.numericValues.column}
            </div>
            <div className="filter-description">
              {filtro.numericValues.comparison}
            </div>
            <div className="filter-description">
              {filtro.numericValues.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function ListFilters() {
  const { filters, setSelectors, setFilters } = useContext(StarWarsContext);
  return (
    <div>
      {filters.length > 1 && renderFiltersActive(filters, setSelectors, setFilters)}
    </div>
  );
}

export default ListFilters;
