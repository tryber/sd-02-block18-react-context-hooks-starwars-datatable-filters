import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

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
  const arrFilter = [...filters];
  arrFilter.splice(0, 2);
  return (
    <div className="filtros">
      {arrFilter.map((filtro, index) => (
        <div key={filtro.numericValues.column} className="mini-filtros">
          <p>
            Filtro:{filtro.numericValues.column}
          </p>
          <p>
            Comparador: {filtro.numericValues.comparison}
          </p>
          <p>
            Valor: {filtro.numericValues.valueComparison}
          </p>
          <button
            type="button"
            onClick={(e) => deleteFilter(e, setSelectors, setFilters)}
            id={index + 2}
            value={filtro.numericValues.column}
          >
            X
          </button>
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
