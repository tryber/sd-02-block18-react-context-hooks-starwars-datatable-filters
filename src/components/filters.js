import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/filters.css';

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
  const { selectors, setFilters, filters } = useContext(StarWarsContext);
  const comparisonvalues = ['-', 'Maior que', 'Menor que', 'ou Igual a'];
  const { column, comparison, valueComparison } = filters.filters[1].numericValues;
  return (
    <div className="filters-container">
      <div className="filters-title">Escolha o filtro: </div>
      <select data-testid="col" className="select-filter" value={column} onChange={(e) => setFilteredSelector(e, 'column', setFilters)}>
        {selectors.map((col) => (<option key={col} value={col}>{col}</option>))}
      </select>
      <select data-testid="comp" className="select-filter" value={comparison} onChange={(e) => setFilteredSelector(e, 'comparison', setFilters)}>
        {comparisonvalues.map((valueComp) => (<option key={valueComp}>{valueComp}</option>))}
      </select>
      <input
        data-testid="value-comp"
        className="input-filter"
        type="number"
        onChange={(e) => setFilteredSelector(e, 'valueComparison', setFilters)}
        value={valueComparison}
      />
    </div>
  );
}

export default Filters;
