import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const renderFilterSelected = (num, onExcludeFilter) => (
  <div data-testid="infoExclude" key={num.column}>
    <span>{`${num.column} `}</span>
    <span>{`${num.comparison} `}</span>
    <span>{`${num.value} `}</span>
    <button
      data-testid="removeFilter"
      value={num.column}
      onClick={(e) => onExcludeFilter(e.target.value)}
      type="button"
    >
      X
    </button>
  </div>
);

const renderColumnSelected = (selectColumn, setColumn) => (
  <select data-testid="column" onChange={({ target }) => setColumn(target.value)}>
    <option value="" />
    {selectColumn
      .map((columnFilters) => <option key={columnFilters}>{columnFilters}</option>)}
  </select>
);

const renderComparisonSelected = (comparisonArray, setComparison) => (
  (
    <select data-testid="comparison" onChange={({ target }) => setComparison(target.value)}>
      <option value="" />
      {comparisonArray.map((comp) => <option key={comp} value={comp}>{comp}</option>)}
    </select>
  )
);

const renderInput = (setValue) => (
  <input data-testid="value" type="number" onChange={({ target }) => setValue(target.value)} />);
const renderButtonFilter = (onAddFilter) => (
  <button type="button" data-testid="filter" onClick={onAddFilter}>Filtrar</button>);

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
      {selectColumn.length > 0 && (
      <div>
        {renderColumnSelected(selectColumn, setColumn)}
        {column && renderComparisonSelected(comparisonArray, setComparison)}
        {comparison && renderInput(setValue)}
        {value && renderButtonFilter(onAddFilter)}
      </div>
      )}
      <div>
        {(filters[0].numericValues) && filters.map(({ numericValues: num }) => (
          renderFilterSelected(num, onExcludeFilter)))}
      </div>
    </div>
  );
};

export default NumericFilter;
