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
  const [filters, setFilters] = useState([{ numericValues: { column: '', comparison: '', value: '' } }]);
  const [sFilters, setSFilters] = useState([{ column: 'Name', order: 'ASC' }]);
  const filterByText = (string) => {
    setText(string);
  };
  const sortColumn = (e) => {
    setSFilters([{
      ...sFilters[0],
      column: e.target.value,
    }]);
  };
  const sortOrder = (e) => {
    setSFilters([{
      ...sFilters[0],
      order: e.target.value,
    }]);
  };
  const sortStrings = () => {
    const { column, order } = sFilters[0];
    if (order === 'ASC') {
      setData(data.sort((a, b) => (a[column] < b[column] ? 1 : -1)));
    }
    if ((order === 'DESC')) {
      setData(data.sort((a, b) => (a[column] > b[column] ? 1 : -1)));
    }
  };
  const sortNumbers = () => {
    const { column, order } = sFilters[0];
    if (order === 'ASC') {
      setData(data.sort((a, b) => (parseInt(a[column], 10) < parseInt(b[column], 10) ? 1 : -1)));
    }
    if ((order === 'DESC')) {
      setData(data.sort((a, b) => (parseInt(a[column], 10) > parseInt(b[column], 10) ? 1 : -1)));
    }
  };
  // export
  const context = {
    data,
    setData,
    error,
    setError,
    filterByText,
    filters,
    setFilters,
    text,
    setText,
    columnValue,
    setColumnValue,
    comparisonValue,
    setComparisonValue,
    numberValue,
    setNumberValue,
    columnOptions,
    setColumnOptions,
    sFilters,
    setSFilters,
    sortColumn,
    sortOrder,
    sortStrings,
    sortNumbers,
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
