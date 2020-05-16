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
    eraseColumn,
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
