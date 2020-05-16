import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import SWContext from './starWarsContext';
import fetchPlanetFromServices from '../services/swAPI';

const SWProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const allColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [columnOptions, setColumnOptions] = useState(allColumns);
  const [filters, setFilters] = useState([{ numericValues: { column: '', comparison: '', value: '' } }]);
  const [sFilters, setSFilters] = useState([{ column: 'Name', order: 'ASC' }]);
  const filterByText = (string) => {
    setText(string);
  };
  const handleSWSuccess = (response) => {
    const { results } = response;
    setData(results.sort((a, b) => (a.name > b.name ? 1 : -1)));
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
    error,
    filterByText,
    filters,
    setFilters,
    text,
    setText,
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
