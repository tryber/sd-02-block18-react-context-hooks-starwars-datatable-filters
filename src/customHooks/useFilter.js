import { useState, useEffect } from 'react';

const useFilter = (planets) => {
  const [name, setName] = useState('');
  const [numericValues, setNumericValues] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);

  useEffect(() => {
    setFilterPlanets(planets);
  }, [planets]);

  return {
    setName,
    setFilterPlanets,
    setNumericValues,
    filterPlanets,
    filters: [
      {
        name,
      },
      ...numericValues,
    ],
  };
};

export default useFilter;
