import React, { useState, useContext, useEffect } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';


export default function SortButton({ children, columnName }) {
  const {
    filters: [filters, setFilters],
  } = useContext(PlanetsDBContext);

  const [sortOrder, setSortOrder] = useState('ASC');
  const [isSorted, setIsSorted] = useState(false);

  const toggleSortOrder = () => {
    setIsSorted(true);
    if (sortOrder === 'ASC') setSortOrder('DESC');
    else if (sortOrder === '') setSortOrder('ASC');
    else setSortOrder('ASC');
  };

  useEffect(() => {
    function setSortings() {
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
    }
    if (isSorted) setSortings();
    setIsSorted(false);
  }, [filters, setFilters, isSorted, columnName, sortOrder]);

  return (<button type="button" onClick={toggleSortOrder}>{children}</button>);
}
