import { useEffect, useContext, useState } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';

export default function useNumericFilters() {
  const [numericFiltersUpdateMap, setNumericFiltersUpdateMap] = useState([false]);
  const { filters: [filters] } = useContext(PlanetsDBContext);
  useEffect(() => {
    const booleanUpdateMap = filters.map((filter) => {
      if ('numericValues' in filter) {
        const shouldUpdateMap = Object.keys(filter.numericValues).map(
          (key) => filter.numericValues[key] !== '' && true,
        );
        return !shouldUpdateMap.includes(false) && true;
      }
      return null;
    });
    setNumericFiltersUpdateMap(booleanUpdateMap.splice(1, booleanUpdateMap.length - 1));
    return (() => setNumericFiltersUpdateMap([false]));
  }, [filters]);

  return numericFiltersUpdateMap;
}
