import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function NameFilterInput() {
  const { setNameFilter } = useContext(StarWarsContext);
  return (
    <input
      type="text"
      placeholder="Filtrar pelo Nome"
      onChange={(e) => setNameFilter(e.target.value)}
    />
  );
}

export default NameFilterInput;
