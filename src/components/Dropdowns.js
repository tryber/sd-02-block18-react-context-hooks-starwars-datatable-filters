import React, { useContext, useState } from 'react';
import SWContext from '../context/starWarsContext';

const Dropdowns = () => {
  const {
    filters,
    setFilters,
    columnOptions,
    setColumnOptions,
  } = useContext(SWContext);
  const [newNumericValues, setNewNumericValues] = useState({ numericValues: { column: '', comparison: '', value: '' } });
  const changeNewNumericValues = (value, e) => {
    setNewNumericValues({
      ...newNumericValues,
      numericValues: {
        ...newNumericValues.numericValues,
        [value]: e.target.value,
      },
    });
  };
  const generateColumns = () => {
    if (columnOptions.length !== 0) {
      return (
        <div>
          <select
            onChange={(e) => changeNewNumericValues('column', e)}
          >
            <option value="" hidden>Select Column</option>
            {columnOptions.map((option) => <option key={option} name="column" value={option}>{option}</option>)}
          </select>
        </div>
      );
    }
    return null;
  };
  const generateComparison = () => {
    if (columnOptions.length !== 0) {
      const comparison = ['more than', 'equal to', 'less than'];
      return (
        <select onChange={(e) => changeNewNumericValues('comparison', e)}>
          <option value="">Select Comparison</option>
          {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      );
    }
    return null;
  };
  const generateNumeric = () => {
    if (columnOptions.length !== 0) {
      return (
        <input
          type="number"
          placeholder="type a number here!"
          onChange={(e) => changeNewNumericValues('value', e)}
        />
      );
    }
    return null;
  };
  const createFilter = () => {
    if (columnOptions.length > 0) {
      setFilters(filters[0].numericValues.column === ''
        ? filters.splice(1).concat(newNumericValues)
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
