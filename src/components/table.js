import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { initial } = useContext(StarWarsContext)
  return (
    <div>
      <div>Table</div>
      <div>{initial}</div>
    </div>
  );
}

export default Table;