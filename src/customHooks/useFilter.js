import { useState, useContext } from 'react';

import ApiContext from '../contexts/ApiContext';
import planetsMock from '../__mocks__/dataMock';

const useFilter = () => {
  const { planets, error } = useContext(ApiContext) || { planets: [] };
  console.log(error);
  const [filterPlanets, setFilterPlanets] = useState((error) ? planetsMock : planets);

  return {
    filterPlanets,
  };
};

export default useFilter;
