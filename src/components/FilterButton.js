import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const FilterButton = () => {
  const { numericFilter } = useContext(StarWarsContext);
  const { column, comparison, value } = numericFilter;
  return (
    <input
      type="submit"
      value="Filtrar"
      className={!(column && comparison && value) && 'filter-button-disabled'}
      data-testid="filter-button"
      disabled={!(column && comparison && value)}
    />
  );
};

export default FilterButton;
