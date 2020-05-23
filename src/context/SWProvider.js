import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../services/SWAPI';

const { Provider } = StarWarsContext;

const SWProvider = ({ children }) => {
  const [swData, setSWData] = useState({
    arrPlanetas: [],
    isLoading: false,
    error: null,
  });

  const [filters, setFilters] = useState([{ name: '' }]);

  const setInputFilter = (value) => {
    const newFilters = filters.map((filtro, index) => (
      index !== 0 ? filtro : { name: value }
    ));
    setFilters(newFilters);
  };

  const setNumericFilter = (value) => {
    const newFilters = [...filters, { numericValues: value }];
    setFilters(newFilters);
  };

  const removeFilter = (coluna) => {
    const newFilters = filters.filter((obj, index) => (
      (index === 0) || (obj.numericValues.column !== coluna)
    ));
    setFilters(newFilters);
  }

  const values = {
    swData,
    filters,
    setInputFilter,
    setNumericFilter,
    removeFilter,
  };

  useEffect(() => {
    setSWData({ ...swData, isLoading: true });
    getPlanets()
      .then(
        (data) => setSWData({ ...swData, arrPlanetas: data.results, isLoading: false }),
      )
      .catch(
        (error) => setSWData({ ...swData, error: error.message, isLoading: false }),
      );
  }, []);

  return (
    <Provider value={values}>
      {children}
    </Provider>
  );
};

export default SWProvider;
