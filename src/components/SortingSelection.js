import React, { useContext } from 'react';
import { acertaTexto } from './Table';
import { Context } from '../context/Provider';

export default function SortingSelection() {
  const { changeSorting } = useContext(Context);

  function renderColumnsSelect() {
    const columns = ['name', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

    return (
      <select name="column" onChange={changeSorting} defaultValue="">
        <option value="" disabled>Select column</option>
        {columns.map((column) => (
          <option key={column} value={column}>{acertaTexto(column)}</option>
        ))}
      </select>
    );
  }

  function renderOrderSelect() {
    return (
      <select name="order" onChange={changeSorting} defaultValue="ASC">
        <option value="ASC">asc. order</option>
        <option value="DESC">desc. order</option>
      </select>
    );
  }

  return (
    <div className="sorting">
      {renderColumnsSelect()}
      {renderOrderSelect()}
    </div>
  );
}
