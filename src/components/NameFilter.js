import React, { useContext } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';

export default function NameFilter() {
  const { filters: [filters, setFilters] } = useContext(PlanetsDBContext);

  const dispatchNameFilter = (event) => {
    const { target: { value: nameInput } } = event;
    return setFilters(filters.map((filter) => {
      if ('name' in filter) return { name: nameInput };
      return filter;
    }));
  };

  return (
    <div>
      <input data-testid="name-filter-input" type="text" onChange={(e) => dispatchNameFilter(e)} />
    </div>
  );
}
