import { useEffect, useState } from 'react';

import getCurrentSwPlanets from '../services/SWapi';

const useFetch = (defaultFetching) => {
  const [planets, setPlanets] = useState(null);
  const [isFetching, setFetching] = useState(defaultFetching);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      await getCurrentSwPlanets()
        .then(
          ({ results }) => setPlanets(results),
          (dataError) => setError(dataError),
        );
      setFetching(false);
    };
    fetchPlanets();
  }, []);

  return {
    planets,
    isFetching,
    error,
  };
};

export default useFetch;
