import { useContext, useEffect } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';

const filterByName = (nameFilter, newFilteredPlanets) => {
  const regExpFilter = new RegExp(nameFilter, 'yi');
  return newFilteredPlanets.filter(
    (planet) => planet.name.match(regExpFilter),
  );
};

const filterByNumericValues = (newFilteredPlanets, { column, value, comparison }) => {
  const columnComparison = (comparedColumn, comparedValue) => ({
    lesserThan: () => comparedColumn < comparedValue,
    equalsThan: () => comparedColumn === comparedValue,
    higherThan: () => comparedColumn > comparedValue,
  });

  return newFilteredPlanets.filter(
    (planet) => columnComparison(Number(planet[column]), Number(value))[comparison](),
  );
};

const addNewFilterRow = (filters, setFilters) => {
  const [, ...numericFilters] = filters;
  const lastFilter = numericFilters[numericFilters.length - 1];
  const { numericValues: { column, comparison, value } } = lastFilter;
  if (column !== '' && comparison !== '' && value !== '' && numericFilters.length < 5) {
    setFilters([...filters, { numericValues: { column: '', comparison: '', value: '' } }]);
  }
};


export default function usePlanetsFiltering() {
  const {
    data: [planetsData],
    filters: [filters, setFilters],
    filteredData: [filteredPlanets, setFilteredPlanets],
  } = useContext(PlanetsDBContext);

  useEffect(() => {
    const [, ...numericFilters] = filters;
    let newFilteredPlanets = planetsData;
    const [{ name: nameFilter }] = filters;

    if (nameFilter) newFilteredPlanets = filterByName(nameFilter, newFilteredPlanets);

    numericFilters.map((filter) => {
      const { numericValues, numericValues: { column, comparison, value } } = filter;
      if (column !== '' && comparison !== '' && value !== '') {
        newFilteredPlanets = filterByNumericValues(newFilteredPlanets, numericValues);
      }
      return filter;
    });

    addNewFilterRow(filters, setFilters);

    setFilteredPlanets(newFilteredPlanets);
  }, [filters, planetsData, setFilteredPlanets]);
  return filteredPlanets;
}
