import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const renderFiltersActive = (filters) => {
  const arrFilter = [...filters];
  arrFilter.splice(0, 2);
  return (
    <div className="filtros">
      {arrFilter.map((filtro, index) => (
        <div className="mini-filtros">
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
            onClick={(e) => alert(e)}
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
  const { filters } = useContext(StarWarsContext);
  console.log(filters.filters.length);
  return (
    <div>
      {filters.filters.length > 2 && renderFiltersActive(filters.filters)}
    </div>
  );
}

export default ListFilters;
