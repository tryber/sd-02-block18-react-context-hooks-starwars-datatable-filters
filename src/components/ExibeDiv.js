import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const ExibeDiv = () => {
  const contextValues = useContext(StarWarsContext);
  const arrayNumericFilters = contextValues.filters.slice(1).map((obj) => obj.numericValues);

  return (
    <div>
      {arrayNumericFilters.map((objetoDeFiltro) => (
        <div>
          <span className="filtros-show" data-testid="filtros-show">
            {`${objetoDeFiltro.column} | ${objetoDeFiltro.comparison} | ${objetoDeFiltro.value} `}
          </span>
          <button
            type="button"
            data-testid="remover-filtro-btn"
            onClick={() => contextValues.removeFilter(objetoDeFiltro.column)}
          >
              X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExibeDiv;
