import { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const SortPlanets = (filteredResults) => {
  const { sortColumns, setFilteredData } = useContext(StarWarsContext);
  const { column, order } = sortColumns;
  const sortedPlanets = filteredResults.sort((a, b) => a[column] - b[column]
    || a[column].toString().localeCompare(b[column].toString()));
  if (order === 'ASC') setFilteredData(sortedPlanets);
  if (order === 'DESC') setFilteredData(sortedPlanets.reverse());
};

export default SortPlanets;
