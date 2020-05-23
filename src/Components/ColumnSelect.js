import React, { useContext } from 'react';
import SwContext from '../Context';

const ColumnSelect = () => {
  const { columns, setColumn } = useContext(SwContext);
  return (
    <select
      key="columnValue"
      name="column"
      onChange={(element) => setColumn(element.target.value)}
    >
      <option hidden>Select a Column</option>
      {columns.map((column) => (
        <option key={column} value={column}>{column}</option>
      ))}
    </select>
  );
};

export default ColumnSelect;
