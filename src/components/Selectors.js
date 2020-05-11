import React from 'react';
import './Selectors.css';
import ColumnSelector from './ColumnSelector';
import ComparisonSelector from './ComparisonSelector';
import NumberSelector from './NumberSelector';
import FilterButton from './FilterButton';
import FiltersList from './FiltersList';

const Selectors = () => (
  <div>
    <form>
      <ColumnSelector />
      <ComparisonSelector />
      <NumberSelector />
    </form>
    <FilterButton />
    <FiltersList />
  </div>
);

export default Selectors;
