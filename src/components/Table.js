import React, { useContext } from 'react';
import { SWContext } from '../context/starWarsContext';
import './Table.css';


const Table = () => {
  const { generateTable, filterByText } = useContext(SWContext);
  return (
    <div>
      <input onChange={(e) => filterByText(e.target.value)} />
      <h2>Filters:</h2>
      {generateTable()}
    </div>
  );
};

export default Table;
