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
