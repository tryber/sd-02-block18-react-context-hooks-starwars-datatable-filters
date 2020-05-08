import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';
import GenerateTable from './GenerateTable';
import './Table.css';

const Table = () => {
  const {
    generateColumns,
    generateComparison,
    generateNumeric,
    buttonFilters,
    filterByText,
  } = useContext(SWContext);

  return (
    <div>
      <input onChange={(e) => filterByText(e.target.value)} />
      {generateColumns()}
      {generateComparison()}
      {generateNumeric()}
      {buttonFilters()}
      <h2>Filters:</h2>
      <GenerateTable />
    </div>
  );
};

export default Table;
