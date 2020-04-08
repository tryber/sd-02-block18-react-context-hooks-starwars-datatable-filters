import { useState, useContext } from 'react';

import ApiContext from '../contexts/ApiContext';

const useFilter = () => {
  const { planets } = useContext(ApiContext) || { planets: [] };
  const [filterPlanets, setFilterPlanets] = useState(planets);

  return {
    filterPlanets,
  };
};

export default useFilter;
