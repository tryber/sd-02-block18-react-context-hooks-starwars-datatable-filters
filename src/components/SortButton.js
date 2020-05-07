import React, { useState, useContext, useEffect } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';


export default function SortButton({ children, columnName }) {
  const {
    filters: [filters, setFilters],
  } = useContext(PlanetsDBContext);

  const [sortOrder, setSortOrder] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  if (columnName === 'name') setSortOrder('ASC');

  const toggleSortOrder = () => {
    setIsSorted(true);
    if (sortOrder === 'ASC') return setSortOrder('DESC');
    if (sortOrder === '') return setSortOrder('ASC');
    return setSortOrder('ASC');
  };

  useEffect(() => {
    function setSortings() {
      return setFilters(filters.map(
        (sortFilter) => {
          if ('column' in sortFilter && sortFilter.column === columnName) {
            return { ...sortFilter, order: sortOrder, isSorted };
          }
          return sortFilter
            && setFilters([...filters, { column: columnName, order: sortOrder, isSorted }]);
        },
      ));
    }
    if (isSorted) setSortings();
  }, [filters, setFilters, isSorted, columnName, sortOrder]);

  return (<button type="button" onClick={toggleSortOrder}>{children}</button>);
}
