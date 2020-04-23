import React, { createContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import fetchPlanetFromServices from '../services/swAPI';

const SWContext = createContext();

// const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

// const comparison = ['more than', 'equal to', 'less than'];

const SWProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  // const [generatedColumn, setGeneratedColumn] = useState(columns);
  // const [column, setColumn] = useState('');
  // const [comparison, setComparison] = useState('');
  // const [value, setValue] = useState('');
  const handleSWSuccess = (response) => {
    const { results } = response;
    setData(results);
    setLoading(false);
  };
  const handleSWFailure = (response) => {
    setError(response.error.message);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchPlanetFromServices()
      .then(
        (response) => handleSWSuccess(response),
        (response) => handleSWFailure(response),
      );
  }, []);

  // export
  const context = {
    loading,
    data,
    error,
  };
  // render
  return (
    <SWContext.Provider value={context}>
      {children}
    </SWContext.Provider>
  );
};

export { SWContext, SWProvider };

SWProvider.propTypes = {
  children: propTypes.node.isRequired,
};
