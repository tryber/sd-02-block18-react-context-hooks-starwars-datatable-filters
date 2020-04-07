import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const NumericFilter = () => {
  const [selectColumn, setSelectColumn] = useState(['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const { addFilter, filters, excludeFilter } = useContext(StarWarsContext);
  const onAddFilter = () => {
    setSelectColumn(selectColumn.filter((col) => col !== column));
    addFilter(column, comparison, value);
    setColumn('');
    setComparison('');
    setValue('');
  };

  const onExcludeFilter = (param) => {
    setSelectColumn([...selectColumn, param]);
    excludeFilter(param);
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
            <option value="maior que">Maior que</option>
            <option value="menor que">Menor que</option>
            <option value="igual a">Igual a</option>
          </select>
        )}
        {column && comparison && <input type="number" onChange={({ target }) => setValue(target.value)} />}
        {column && comparison && value && <button type="button" onClick={() => onAddFilter()}>Filtrar</button>}
      </div>
      <div>
        {(filters[0].numericValues) && filters.map(({ numericValues }) => (
          <div key={numericValues.column}>
            <span>
              {numericValues.column}
              {' '}
            </span>
            <span>
              {numericValues.comparison}
              {' '}
            </span>
            <span>
              {numericValues.value}
              {' '}
            </span>
            <button
              value={numericValues.column}
              onClick={({ target }) => onExcludeFilter(target.value)}
              type="button"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div >
  );
};

export default NumericFilter;
