import React, { useState } from 'react';
import propTypes from 'prop-types';
import SWContext from './starWarsContext';

const SWProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const allColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [columnOptions, setColumnOptions] = useState(allColumns);
  const [columnValue, setColumnValue] = useState('');
  const [comparisonValue, setComparisonValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [filters, setFilters] = useState({ filters: [{ numericValues: { column: '', comparison: '', value: '' } }] });
  const generateColumns = () => (
    <div>
      <select
        onChange={(e) => setColumnValue(e.target.value)}
        value={columnValue}
      >
        <option value="" hidden>Select Column</option>
        {columnOptions.map((option) => <option key={option} name="column" value={option}>{option}</option>)}
      </select>
    </div>
  );
  const generateComparison = () => {
    const comparison = ['more than', 'equal to', 'less than'];
    return (
      <select onChange={(e) => setComparisonValue(e.target.value)}>
        <option value="">Select Comparison</option>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  };
  const generateNumeric = () => (
    <input
      type="number"
      placeholder="type a number here!"
      value={numberValue}
      onChange={(e) => setNumberValue(e.target.value)}
    />
  );
  const filterByText = (string) => {
    setText(string);
  };
  const numberFilter = (newNumericValues) => {
    const columnFilter = columnOptions.filter((item) => item !== columnValue);
    setColumnOptions(columnFilter);
    setFilters(filters[0].column === ''
      ? [...newNumericValues]
      : filters.concat(newNumericValues));
  };
  const createFilter = () => {
    const newNumericValues = { columnValue, comparisonValue, numberValue };
    console.log(newNumericValues);
    numberFilter(newNumericValues);
    setColumnValue('');
    setComparisonValue('');
    setNumberValue('');
  };
  const buttonFilters = () => (
    <button type="button" onClick={() => createFilter()}>Filter!</button>
  );
  // export
  const context = {
    data,
    setData,
    error,
    setError,
    generateColumns,
    generateComparison,
    generateNumeric,
    setColumnOptions,
    comparisonValue,
    buttonFilters,
    filters,
    setFilters,
    text,
    filterByText,
  };
  // render
  return (
    <SWContext.Provider value={context}>
      {children}
    </SWContext.Provider>
  );
};

export default SWProvider;

SWProvider.propTypes = {
  children: propTypes.node.isRequired,
};
