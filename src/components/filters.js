import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { selectors, setFilters } = useContext(StarWarsContext);
  const comparisonvalues = ['-', 'Maior que', 'Menor que', 'ou Igual a'];

  const setFilteredSelector = (e, part) => {
    const { value } = e.target;
    setFilters((prevState) => {
      return {
        ...prevState,
        filters: prevState.filters.map((elem, index) => {
          if (index === 1) {
            return {
              ...elem,
              numericValues: { ...prevState.filters[1].numericValues, [part]: value },
            };
          }
          return elem;
        }),
      };
    });
  };

  return (
    <div>
      <div>Escolha o filtro: </div>
      <select onChange={(e) => setFilteredSelector(e, 'column')}>
        {selectors.map((column) => (<option key={column} value={column}>{column}</option>))}
      </select>
      <select onChange={(e) => setFilteredSelector(e, 'comparison')}>
        {comparisonvalues.map((valueComp) => (<option key={valueComp}>{valueComp}</option>))}
      </select>
      <input
        type="number"
        onChange={(e) => setFilteredSelector(e, 'valueComparison')}
      />
      <button type="button" onClick={() => alert('button')}>Filtrar</button>
    </div>
  );
}

export default Filters;
