import React, { useContext } from 'react';

import FilterContext from '../contexts/FilterContext';
import FunctionConText from '../contexts/FunctionContext';

const filtersList = (filters, removeFilter, setNumericValues) => {
  const [, ...rest] = filters;
  return rest.map(({ column, comparison, value }) => (
    <div key={column}>
      <button
        data-testid={`remove-button-${column}`}
        id={column}
        type="button"
        onClick={({ target }) => removeFilter(target.id, rest, setNumericValues)}
      >
        X
      </button>
      {`${column}|${comparison}|${value}`}
    </div>
  ));
};

const FilterList = () => {
  const { filters } = useContext(FilterContext);
  const { removeFilter, setNumericValues } = useContext(FunctionConText);

  return (
    <div>
      Filters List:
      {filtersList(filters, removeFilter, setNumericValues)}
    </div>
  );
};

export default FilterList;
