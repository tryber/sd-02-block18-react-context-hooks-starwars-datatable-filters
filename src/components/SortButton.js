import React, { useState, useContext, useEffect } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';


export default function SortButton({ children, columnName }) {
  const {
    filters: [filters, setFilters],
  } = useContext(PlanetsDBContext);

  const [sortOrder, setSortOrder] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  const toggleSortOrder = () => {
    setIsSorted(true);
    if (sortOrder === 'ASC') setSortOrder('DESC');
    else if (sortOrder === '') setSortOrder('ASC');
    else setSortOrder('ASC');
  };

  useEffect(() => {
    function setSortings() {
      console.log(Object.keys(filters));
      if ('column' in filters && filters.column === columnName) {
        setFilters(filters.map(
          (filter) => {
            console.log(filter);
            return filter.column === columnName && { ...filter, order: sortOrder };
          },
        ));
      } else {
        setFilters([...filters, { column: columnName, order: sortOrder }]);
      }
    }
    if (isSorted) setSortings();
    setIsSorted(false);
  }, [filters, setFilters, isSorted, columnName, sortOrder]);

  return (<button type="button" onClick={toggleSortOrder}>{children}</button>);
}
