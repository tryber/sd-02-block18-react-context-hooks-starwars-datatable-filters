import React, { createContext, useState, useEffect } from 'react';
import fetchPlanets from '../services/fetchPlanets';

export const SWAPIContext = createContext();

const SWAPIProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets().then((results) => {
      setPlanets(results);
      setIsFetching(false);
    });
  }, []);

  const context = {
    isFetching,
    planets,
  };

  return (
    <SWAPIContext.Provider value={context}>
      {children}
    </SWAPIContext.Provider>
  );
};

export default SWAPIProvider;
