import React, { useContext } from 'react';
import { StarWarsContext, filterAll } from '../context/StarWarsContext';
import './Selectors.css';
import ColumnSelector from './ColumnSelector';
import ComparisonSelector from './ComparisonSelector';
import NumberSelector from './NumberSelector';
import FilterButton from './FilterButton';
import FiltersList from './FiltersList';

const Selectors = () => {
  const { filters, setFilteredData, setFilters } = useContext(StarWarsContext);

  const filterByColumn = (
    name, results, column, comparison, value, allFilters, filteredPlanets,
  ) => {
    const [, ...rest] = allFilters;
    let filteredResults = [];
    if (rest.length) {
      filteredResults = filterAll(name, filteredPlanets, column, comparison, value);
    } else {
      filteredResults = filterAll(name, results, column, comparison, value);
    }
    setFilteredData(filteredResults);
    setFilters([...filters, { numericValues: { column, comparison, value } }]);
  };

  return (
    <div>
      <form>
        <ColumnSelector />
        <ComparisonSelector />
        <NumberSelector />
      </form>
      <FilterButton filterCallback={filterByColumn} />
      <FiltersList />
    </div>
  );
};

export default Selectors;
