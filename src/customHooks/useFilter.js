import { useState, useEffect } from 'react';

const useFilter = (planets) => {
  const [name, setName] = useState('');
  const [filterPlanets, setFilterPlanets] = useState([]);

  useEffect(() => {
    setFilterPlanets(planets);
  }, [planets]);

  return {
    setName,
    setFilterPlanets,
    filterPlanets,
    filters: [
      {
        name,
      },
      {
        numeric_values: {
          column: '',
          population: '',
          comparison: '',
        },
      },
    ],
  };
};

export default useFilter;
