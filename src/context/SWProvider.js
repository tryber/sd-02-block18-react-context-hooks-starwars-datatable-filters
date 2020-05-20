import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import SWContext from './starWarsContext';
import fetchPlanetFromServices from '../services/swAPI';

const allColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

const SWProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [columnOptions, setColumnOptions] = useState(allColumns);
  const [filters, setFilters] = useState([{ numericValues: { column: '', comparison: '', value: '' } }]);
  const [sFilters, setSFilters] = useState([{ column: 'name', order: 'ASC' }]);
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
  useEffect(() => {
    fetchPlanetFromServices()
      .then(
        (response) => handleSWSuccess(response),
        (response) => handleSWFailure(response),
      );
  }, []);
  const createFilter = () => {
    setFilters(filters[0].numericValues.column === ''
      ? [newNumericValues]
      : filters.concat(newNumericValues));
    const columnFilter = columnOptions
      .filter((item) => item !== newNumericValues.numericValues.column);
    setColumnOptions(columnFilter);
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
    filters,
    text,
    setText,
    eraseColumn,
    columnOptions,
    sFilters,
    setSFilters,
    changeNewNumericValues,
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
