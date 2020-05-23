import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const OrdenadorDeColunas = () => {
  const contextValues = useContext(StarWarsContext);

  const arrayColunas = ['name', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  return (
    <div>
      <label htmlFor="order">
        <span className="order-text">Ordene alguma coluna:</span>
        <select
          defaultValue="name"
          onChange={(event) => contextValues.setColumnOrder(event.target.value)}
        >
          {arrayColunas.map((coluna) => <option value={coluna}>{coluna}</option>)}
        </select>
        <select
          defaultValue="ASC"
          onChange={(event) => contextValues.setOrdenation(event.target.value)}
        >
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </label>
    </div>
  );
};

export default OrdenadorDeColunas;
