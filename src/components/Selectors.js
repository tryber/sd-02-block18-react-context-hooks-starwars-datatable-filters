import React from 'react';
import './Selectors.css';
import ColumnSelector from './ColumnSelector';
import ComparisonSelector from './ComparisonSelector';
import NumberSelector from './NumberSelector';
import FilterButton from './FilterButton';
import FiltersList from './FiltersList';

const Selectors = () => (
  <div>
    <form className="numericForm">
      <section className="numeric-section">
        <ColumnSelector />
        <ComparisonSelector />
        <NumberSelector />
      </section>
      <section>
        <FilterButton />
      </section>
    </form>
    <FiltersList />
  </div>
);

export default Selectors;
