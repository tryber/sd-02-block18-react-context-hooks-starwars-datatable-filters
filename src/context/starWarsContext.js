import React, { createContext, useState, useEffect } from 'react';
import fetchPlanetFromServices from '../services/swAPI';

const SWContext = createContext();

const SWProvider = ({ children }) => {
  // state
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  // functions
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
    setLoading,
    data,
    setData,
    error,
    setError,
    handleSWSuccess,
    handleSWFailure,
  };
  // render
  return (
    <SWContext.Provider value={context}>
      {children}
    </SWContext.Provider>
  );
};


export { SWContext, SWProvider };
