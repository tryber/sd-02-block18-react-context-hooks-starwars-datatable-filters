import React, { useContext } from 'react';

import FilterContext from '../contexts/FilterContext';

const filtersList = (filters) => {
  const [, ...rest] = filters;
  return rest.map(({ column, comparison, value }) => (
    <div key={column}>
      <button data-testid="remove-button" type="button">X</button>
      {`${column}|${comparison}|${value}`}
    </div>
  ));
};

const FilterList = () => {
  const { filters } = useContext(FilterContext);

  return (
    <div>
      Filters List:
      {filtersList(filters)}
    </div>
  );
};

export default FilterList;
