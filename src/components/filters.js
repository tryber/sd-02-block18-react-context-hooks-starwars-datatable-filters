import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { selectors } = useContext(StarWarsContext);
  const comparisonvalues = ['-', 'Maior que', 'Menor que', 'ou Igual a'];
  return (
    <div>
      <div>Escolha o filtro: </div>
      <select onChange={() => console.log('trocou o selector')}>
        {selectors.map((column) => (<option key={column} value={column}>{column}</option>))}
      </select>
      <select onChange={() => console.log('trocou o selector maior q')}>
        {comparisonvalues.map((valueComp) => (<option key={valueComp}>{valueComp}</option>))}
      </select>
      <input
        type="number"
        onChange={() => console.log('trocou o selector number')}
      />
      <button type="button" onClick={() => alert('button')}>Filtrar</button>
    </div>
  );
}

export default Filters;
