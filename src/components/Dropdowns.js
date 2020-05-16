import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const Dropdowns = () => {
  const {
    columnOptions,
    changeNewNumericValues,
    generateNumeric,
    createFilter,
  } = useContext(SWContext);

  const generateColumns = () => (
    columnOptions.length !== 0 && (
      <div>
        <select
          onChange={(e) => changeNewNumericValues('column', e)}
        >
          <option value="" hidden>Select Column</option>
          {columnOptions
            .map((option) => <option key={option} name="column" value={option}>{option}</option>)}
        </select>
      </div>
    )
  );
  const generateComparison = () => {
    const comparison = ['more than', 'equal to', 'less than'];
    return columnOptions.length !== 0 && (
      <select onChange={(e) => changeNewNumericValues('comparison', e)}>
        <option value="">Select Comparison</option>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
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
