import React, { useState } from 'react';
import propTypes from 'prop-types';
import SWContext from './starWarsContext';

const allColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

const SWProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [columnOptions, setColumnOptions] = useState(allColumns);
  const [filters, setFilters] = useState([{ numericValues: { column: '', comparison: '', value: '' } }]);
  const [sFilters, setSFilters] = useState([{ column: 'Name', order: 'ASC' }]);
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
  const handleSWSuccess = (response) => {
    setData(response.results.sort((a, b) => (a.name > b.name ? 1 : -1)));
  };
  const handleSWFailure = (response) => {
    setError(response.message);
  };
  const sortData = () => {
    const { column, order } = sFilters[0];
    const sortedArray = data.sort((a, b) => a[column] - b[column] || a[column]
      .toString().localeCompare(b[column].toString()));
    return order === 'ASC'
      ? setData(sortedArray)
      : setData(sortedArray.reverse());
  };
  const generateColumns = () => (
    <div>
      <select
        onChange={(e) => changeNewNumericValues('column', e)}
      >
        <option value="" hidden>Select Column</option>
        {columnOptions
          .map((option) => <option key={option} name="column" value={option}>{option}</option>)}
      </select>
    </div>
  );
  const generateComparison = () => {
    const comparison = ['more than', 'equal to', 'less than'];
    return (
      <select onChange={(e) => changeNewNumericValues('comparison', e)}>
        <option value="">Select Comparison</option>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  };
  const generateNumeric = () => (
    <input
      type="number"
      placeholder="type a number here!"
      onChange={(e) => changeNewNumericValues('value', e)}
    />
  );
  const createFilter = () => {
    setFilters(filters[0].numericValues.column === ''
      ? [newNumericValues]
      : filters.concat(newNumericValues));
    const columnFilter = columnOptions
      .filter((item) => item !== newNumericValues.numericValues.column);
    setColumnOptions(columnFilter);
  };
  const filterByText = (string) => {
    setText(string);
  };
  const eraseColumn = (array, column) => {
    const restoreFilter = array.filter(({ numericValues }) => (numericValues.column !== column));
    const initialFilter = {
      filters: [{
        numericValues: {
          column: '',
          comparison: '',
          value: '',
        },
      },
      ],
    };
    setFilters(restoreFilter.length === 0 ? [initialFilter.filters[0]] : restoreFilter);
    setColumnOptions([...columnOptions, column]);
  };
  const sortOrder = (e) => {
    setSFilters([{
      ...sFilters[0],
      order: e.target.value,
    }]);
  };
  const sortColumn = (e) => {
    setSFilters([{
      ...sFilters[0],
      column: e.target.value,
    }]);
  };
  // export
  const context = {
    data,
    error,
    handleSWFailure,
    handleSWSuccess,
    filterByText,
    filters,
    text,
    setText,
    eraseColumn,
    columnOptions,
    sFilters,
    sortOrder,
    sortColumn,
    sortData,
    generateColumns,
    generateComparison,
    generateNumeric,
    createFilter,
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
