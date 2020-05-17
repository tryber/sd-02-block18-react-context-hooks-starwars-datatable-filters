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
    <button type="button" onClick={() => columnOptions.length > 0 && createFilter()}>Filter!</button>
  );
  return (
    <div>
      {columnOptions.length !== 0
        ? (
          [generateColumns(),
            generateComparison(),
            generateNumeric(),
            buttonFilters(),
          ])
        : <div>No more filters available!</div>}
    </div>

  );
};
export default Dropdowns;
