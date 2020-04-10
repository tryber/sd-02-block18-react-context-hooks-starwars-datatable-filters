import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/filterButton.css';

const addNewFilter = (column, comparison, valueComparison, setFilters, setSelectors) => {
  setSelectors((prevSelectors) => [
    ...prevSelectors.filter((elem) => elem !== column),
  ]);
  setFilters((prevfilters) => ({
    ...prevfilters,
    filters: [...prevfilters.filters.map((elem, index) => {
      if (index === 1) {
        return {
          ...elem,
          numericValues: {
            column: 'coluna',
            comparison: '-',
            valueComparison: 0,
          },
        };
      }
      return elem;
    }), {
      numericValues: {
        column,
        comparison,
        valueComparison,
      },
    }],
  }));
};

const addFilter = (filters, setFilters, setSelectors) => {
  const { column, comparison, valueComparison } = filters.filters[1].numericValues;
  if ((column !== 'coluna' && comparison !== '-' && valueComparison >= 0)) {
    addNewFilter(column, comparison, valueComparison, setFilters, setSelectors);
  } else alert('Escolha os três campos');
};

function FilterButton() {
  const {
    filters, setFilters, setSelectors,
  } = useContext(StarWarsContext);
  useEffect(() => {
  }, [filters]);
  return (
    <div>
      <button
        type="button"
        onClick={() => addFilter(filters, setFilters, setSelectors)}
        className="filter-btn"
        data-testid="btn-filter"
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterButton;
