import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const Dropdowns = () => {
  const {
    columnOptions,
    generateColumns,
    generateComparison,
    createFilter,
    changeNewNumericValues,
  } = useContext(SWContext);
  const generateNumeric = () => (
    <input
      type="number"
      placeholder="type a number here!"
      onChange={(e) => changeNewNumericValues('value', e)}
    />
  );
  return (
    <div>
      {columnOptions.length !== 0
        ? (
      [generateColumns(),
        generateComparison(),
        generateNumeric(),
        <button
          type="button"
          onClick={() => createFilter()}
        >
        Filter!
        </button>,
      ])
        : <div>No more filters available!</div>}
    </div>

  );
};
export default Dropdowns;
