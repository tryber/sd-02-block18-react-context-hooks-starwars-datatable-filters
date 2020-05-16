import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const Dropdowns = () => {
  const {
    filters,
    setFilters,
    columnOptions,
    setColumnOptions,
    newNumericValues,
    generateColumns,
    generateComparison,
    generateNumeric,
  } = useContext(SWContext);

  const createFilter = () => {
    if (columnOptions.length > 0) {
      setFilters(filters[0].numericValues.column === ''
        ? [newNumericValues]
        : filters.concat(newNumericValues));
    }
    const columnFilter = columnOptions
      .filter((item) => item !== newNumericValues.numericValues.column);
    setColumnOptions(columnFilter);
  };
  const buttonFilters = () => (
    <button type="button" onClick={() => createFilter()}>Filter!</button>
  );
  return (
    <div>
      {generateColumns()}
      {generateComparison()}
      {generateNumeric()}
      {columnOptions.length !== 0
        ? buttonFilters()
        : <div>No more filters available!</div>}
    </div>

  );
};
export default Dropdowns;
