import React, { useContext } from 'react';
import { SWContext } from '../context/starWarsContext';
import './Table.css';

const Table = () => {
  const {
    data,
    error,
    generateColumns,
    generateComparison,
    generateTable,
    generateNumeric,
    buttonFilters,
    filters,
    filterByText,
    text,
  } = useContext(SWContext);
  return (
    <div>
      <input onChange={(e) => filterByText(e.target.value)} />
      {generateColumns()}
      {generateComparison()}
      {generateNumeric()}
      {buttonFilters()}
      <h2>Filters:</h2>
      {generateTable(data, error, text, filters)}
    </div>
  );
};

export default Table;
