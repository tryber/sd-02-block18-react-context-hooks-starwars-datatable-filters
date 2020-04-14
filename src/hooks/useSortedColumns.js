import { useEffect, useState } from 'react';

export default function useSortedColumns(filteredPlanets, filters) {
  const [sortedPlanets, setSortedPlanets] = useState(filteredPlanets);

  useEffect(() => {
    filters.forEach((filter) => {
      if (filter.order === 'ASC') {
        setSortedPlanets(filteredPlanets.sort(
          (planetA, planetB) => (planetA[filter.column] > planetB[filter.column] ? 1 : -1),
        ));
      } else {
        setSortedPlanets(filteredPlanets.sort(
          (planetA, planetB) => (planetA[filter.column] < planetB[filter.column] ? 1 : -1),
        ));
      }
    });
  }, [filters, filteredPlanets, setSortedPlanets]);

  return sortedPlanets;
}
