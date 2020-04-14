import { useContext, useEffect } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';

export default function useSortColumns() {
  const {
    filters: [filters, setFilters],
    filteredData: [filteredPlanets, setFilteredPlanets],
  } = useContext(PlanetsDBContext);

  const newFilteredPlanets = filteredPlanets;

  useEffect(() => {
    filters.forEach((filter) => {
      if ('order' in filter) {
        if (filter.order === 'ASC') {
          setFilteredPlanets(newFilteredPlanets.sort(
            (planetA, planetB) => (planetA[filter.column] > planetB[filter.column] ? 1 : -1),
          ));
        } else {
          setFilteredPlanets(newFilteredPlanets.sort(
            (planetA, planetB) => (planetA[filter.column] < planetB[filter.column] ? 1 : -1),
          ));
        }
      }
    });
  }, [filters, setFilters]);
}
