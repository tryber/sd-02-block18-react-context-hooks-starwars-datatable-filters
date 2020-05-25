import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const FilterButton = () => {
  const { filters, numericFilter, setFilters } = useContext(StarWarsContext);
  const { column, comparison, value } = numericFilter;
  return (
    <input
      type="reset"
      value="Filtrar"
      data-testid="filter-button"
      onClick={() => {
        setFilters([...filters, { numericValues: { column, comparison, value } }]);
      }}
      disabled={!(column && comparison && value)}
    />
  );
};

export default FilterButton;
