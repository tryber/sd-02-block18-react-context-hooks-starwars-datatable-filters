import React, { useContext } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';


export default function SortButton({ children, columnName }) {
  const {
    filters: [filters, setFilters],
  } = useContext(PlanetsDBContext);

  const toggleSortOrder = () => {
    const switchOrder = (order) => (order === 'ASC' ? 'DESC' : 'ASC');

    function setSorting() {
      if (!filters.some(({ column }) => column === columnName)) {
        return setFilters([...filters, { column: columnName, order: 'ASC' }]);
      }
      return setFilters(filters.map(
        (sortFilter) => {
          if ('column' in sortFilter && sortFilter.column === columnName) {
            return { ...sortFilter, order: switchOrder(sortFilter.order) };
          }
          return sortFilter;
        },
      ));
    }

    setSorting();
  };

  return (<button type="button" key={columnName} onClick={toggleSortOrder}>{children}</button>);
}
