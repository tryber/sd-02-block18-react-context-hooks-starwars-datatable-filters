import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/listFilters.css';

const deleteFilter = (e, setSelectors, setFilters) => {
  const { id, value } = e.target;
  console.log(id, value);
  setSelectors((prevSelector) => [...prevSelector, value]);
  setFilters((prevSelector) => ({
    ...prevSelector,
    filters: prevSelector.filters.filter((elem, index) => index !== parseInt(id, 10)),
  }));
};

const renderFiltersActive = (filters, setSelectors, setFilters) => {
  const cpFilters = [...filters];
  cpFilters.splice(0, 2);
  return (
    <div className="active-filters-container">
      {cpFilters.map((filtro, index) => (
        <div key={filtro.numericValues.column} className="active-filters">
          <div>
            <button
              type="button"
              onClick={(e) => deleteFilter(e, setSelectors, setFilters)}
              id={index + 2}
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
                {filtro.numericValues.valueComparison}
              </div>
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
      {filters.filters.length > 2 && renderFiltersActive(filters.filters, setSelectors, setFilters)}
    </div>
  );
}

export default ListFilters;
