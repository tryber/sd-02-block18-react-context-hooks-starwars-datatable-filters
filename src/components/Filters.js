import React, { useContext } from 'react';
import './Filters.css';
import { StarWarsContext } from '../context/StarWarsContext';

const Filters = () => {
  const { name, renderNumValues, nameFilter } = useContext(StarWarsContext);
  return (
    <div className="number-filters">
      {renderNumValues()}
      <span>Digite o nome do planeta: </span>
      <input
        type="text"
        data-testid="boxName"
        placeholder="Digite aqui"
        onChange={(e) => nameFilter(e.target.value)}
        value={name}
      />
    </div>
  );
};

export default Filters;
