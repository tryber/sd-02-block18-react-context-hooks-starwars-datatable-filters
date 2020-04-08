import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const setFilteredSelector = (e, part, setFilters) => {
  const { value } = e.target;
  setFilters((prevState) => ({
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
  }));
};

function Filters() {
  const { selectors, setFilters } = useContext(StarWarsContext);
  const comparisonvalues = ['-', 'Maior que', 'Menor que', 'ou Igual a'];
  return (
    <div>
      <div>Escolha o filtro: </div>
      <select onChange={(e) => setFilteredSelector(e, 'column', setFilters)}>
        {selectors.map((column) => (<option key={column} value={column}>{column}</option>))}
      </select>
      <select onChange={(e) => setFilteredSelector(e, 'comparison', setFilters)}>
        {comparisonvalues.map((valueComp) => (<option key={valueComp}>{valueComp}</option>))}
      </select>
      <input
        type="number"
        onChange={(e) => setFilteredSelector(e, 'valueComparison', setFilters)}
      />
      <button type="button" onClick={() => alert('button')}>Filtrar</button>
    </div>
  );
}

export default Filters;
