import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';
import GenerateTable from './GenerateTable';
import Dropdowns from './Dropdowns';
import './Table.css';

const Table = () => {
  const { filterByText } = useContext(SWContext);

  return (
    <div>
      <input onChange={(e) => filterByText(e.target.value)} />
      <Dropdowns />
      <h2>Filters:</h2>
      <GenerateTable />
    </div>
  );
};

export default Table;
