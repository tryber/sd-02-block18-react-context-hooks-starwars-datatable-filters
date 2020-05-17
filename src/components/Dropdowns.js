import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const Dropdowns = () => {
  const {
    columnOptions,
    generateColumns,
    generateComparison,
    generateNumeric,
    createFilter,
  } = useContext(SWContext);

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
