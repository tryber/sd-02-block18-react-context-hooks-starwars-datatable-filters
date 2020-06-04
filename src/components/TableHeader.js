import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function TableHeader() {
  const { setSort, sortColumn } = useContext(StarWarsContext);
  const titles = [
    'name', 'population',
    'orbital_period', 'diameter',
    'climate', 'gravity',
    'terrain', 'rotation_period',
    'surface_water',
    'films', 'created',
    'edited', 'url',
  ];

  const setColumnSort = (column) => {
    let columnOrder = 'ASC';
    if (column === sortColumn.column) {
      columnOrder = (sortColumn.order === 'ASC') ? 'DESC' : 'ASC';
    }
    setSort({ column, order: columnOrder });
  };

  return (
    <tr>
      {titles.map((title) => (
        <th key={title}>
          <button type="button" onClick={(e) => setColumnSort(e.target.innerHTML)}>{title}</button>
        </th>
      ))}
    </tr>
  );
}

export default TableHeader;
