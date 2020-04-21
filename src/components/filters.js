import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/filters.css';

const setFilteredSelector = (e, part, setActualFilter) => {
  const { value } = e.target;
  setActualFilter((prevState) => ({
    ...prevState,
    [part]: value,
  }));
};

function Filters() {
  const { selectors, actualFilter, setActualFilter } = useContext(StarWarsContext);
  const comparisonvalues = ['-', 'Maior que', 'Menor que', 'ou Igual a'];
  const { column, comparison, value } = actualFilter;
  return (
    <div className="filters-container">
      <div className="filters-title">Escolha o filtro: </div>
      <select data-testid="col" className="select-filter" value={column} onChange={(e) => setFilteredSelector(e, 'column', setActualFilter)}>
        {selectors.map((col) => (<option key={col} value={col}>{col}</option>))}
      </select>
      <select data-testid="comp" className="select-filter" value={comparison} onChange={(e) => setFilteredSelector(e, 'comparison', setActualFilter)}>
        {comparisonvalues.map((valueComp) => (<option key={valueComp}>{valueComp}</option>))}
      </select>
      <input
        data-testid="value-comp"
        className="input-filter"
        type="number"
        onChange={(e) => setFilteredSelector(e, 'value', setActualFilter)}
        value={value}
      />
    </div>
  );
}

export default Filters;
