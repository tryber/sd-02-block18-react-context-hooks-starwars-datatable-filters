import React, { createContext, useState, useEffect } from 'react';
import fetchPlanetFromServices from '../services/swAPI';

const SWContext = createContext();

const SWProvider = ({ children }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  // functions
  const handleSWSuccess = (response) => {
    const { results } = response;
    setLoading(false);
    setData(results);
  };
  const handleSWFailure = (response) => {
    setLoading(false);
    setError(response.error.message);
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
  const context = [
    loading,
    setLoading,
    data,
    setData,
    error,
    setError,
    handleSWSuccess,
    handleSWFailure,
  ];
  // render
  return (
    <SWContext.Provider value={context}>
      {children}
    </SWContext.Provider>
  );
};


export { SWContext, SWProvider };
