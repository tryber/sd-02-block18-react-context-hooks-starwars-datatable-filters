import React, { useContext } from 'react';
import './Selectors.css';
import ColumnSelector from './ColumnSelector';
import ComparisonSelector from './ComparisonSelector';
import NumberSelector from './NumberSelector';
import FilterButton from './FilterButton';
import FiltersList from './FiltersList';
import { StarWarsContext } from '../context/StarWarsContext';

const Selectors = () => {
  const { filters, numericFilter, setNumericFilter, setFilters } = useContext(StarWarsContext);
  const { column, comparison, value } = numericFilter;
  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    setFilters([...filters, { numericValues: { column, comparison, value } }]);
    setNumericFilter({ column: '', comparison: '', value: '' });
  }
  return (
    <div>
      <form className="numericForm" onSubmit={handleSubmit}>
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
};

export default Selectors;
