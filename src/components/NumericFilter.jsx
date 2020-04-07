import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const renderFilterSelected = (num, onExcludeFilter) => (
  <div key={num.column}>
    <span>{`${num.column} `}</span>
    <span>{`${num.comparison} `}</span>
    <span>{`${num.value} `}</span>
    <button value={num.column} onClick={(e) => onExcludeFilter(e.target.value)} type="button">
      X
    </button>
  </div>
);

const NumericFilter = () => {
  const [selectColumn, setSelectColumn] = useState(['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const comparisonArray = ['maior que', 'menor que', 'igual a'];
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const { addFilter, filters, excludeFilter } = useContext(StarWarsContext);
  const onAddFilter = () => {
    setSelectColumn(selectColumn.filter((col) => col !== column));
    addFilter(column, comparison, value); setColumn(''); setComparison(''); setValue('');
  };
  const onExcludeFilter = (param) => {
    setSelectColumn([...selectColumn, param]); excludeFilter(param);
  };
  return (
    <div>
      <div>
        <select onChange={({ target }) => setColumn(target.value)}>
          <option value=""> </option>
          {selectColumn
            .map((columnFilters) => <option key={columnFilters}>{columnFilters}</option>)}
        </select>
        {column && (
          <select onChange={({ target }) => setComparison(target.value)}>
            <option value=""> </option>
            {comparisonArray.map((comp) => <option key={comp} value={comp}>{comp}</option>)}
          </select>
        )}
        {column && comparison
          && <input type="number" onChange={({ target }) => setValue(target.value)} />}
        {column && comparison && value
          && <button type="button" onClick={() => onAddFilter()}>Filtrar</button>}
      </div>
      <div>
        {(filters[0].numericValues) && filters.map(({ numericValues: num }) => (
          renderFilterSelected(num, onExcludeFilter)))}
      </div>
    </div>
  );
};

export default NumericFilter;
