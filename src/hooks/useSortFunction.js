import { useContext, useEffect, useState } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';

export default useSortFunction() {
  useEffect(() => {
    filters.forEach((filter) => {
      if (filter.column === columnName) {
        return setFilters(filters.map(
          (sortFilter) => {
            if (sortFilter.column === columnName) return { ...sortFilter, order: sortOrder };
            return sortFilter;
          },
        ));
      }
      return setFilters([...filters, { column: columnName, order: sortOrder }]);
    });
  }, [filters, setFilters, columnName, sortOrder]);
}
