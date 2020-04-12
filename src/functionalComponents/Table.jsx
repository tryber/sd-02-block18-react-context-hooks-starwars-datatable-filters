import React, { useContext } from 'react';
import {StarWarsContext} from '../context/StarWarsContext';
import './style/Table.css';

const Table = () => {

  const value = useContext(StarWarsContext);
  console.log(value)

  return (
      <React.Fragment>
        <input type="text" />
        <button>Search</button>
        <div>StarWars DataTable with Filters</div>
      </React.Fragment>
  );
}


export default Table;
