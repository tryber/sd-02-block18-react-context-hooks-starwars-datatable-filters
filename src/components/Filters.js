import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import ActiveFilters from './ActiveFilters';
import NameFilterInput from './NameFilterInput';
import ColumnFilterSelect from './ColumnFilterSelect';
import ComparisonFilterSelect from './ComparisonFilterSelect';
import ValueFilterInput from './ValueFilterInput';

const emptyFilters = (
  <div>
    <ActiveFilters />
    <div className="filters">
      <NameFilterInput />
      <div className="filter-planets">
        All filters are being used
      </div>
    </div>
  </div>
);

function Filters() {
  const {
    numericFilterObj: { column, comparison, value },
    setFilterObj, setNumericFilters, numericFilters,
  } = useContext(StarWarsContext);
  if (numericFilters.length === 5) {
    return emptyFilters;
  }
  return (
    <div>
      <ActiveFilters />
      <div className="filters">
        <NameFilterInput />
        Filtrar por Valores Numéricos
        <div className="filter-planets">
          <ColumnFilterSelect />
          <ComparisonFilterSelect />
          <ValueFilterInput />
          {column && comparison && value
          && (
          <button
            type="button"
            onClick={() => {
              setNumericFilters({ column, comparison, value });
              setFilterObj({ column: '', comparison, value });
            }}
          >
            Adicionar Filtro
          </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filters;
