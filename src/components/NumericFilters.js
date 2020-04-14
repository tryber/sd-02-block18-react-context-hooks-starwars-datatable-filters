import React, { useContext } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';


function renderColumnsOptions(filterIndex, actualColumn, filters, setFilter) {
  const selectors = [
    ['', '   '],
    ['population', 'Population'],
    ['orbital_period', 'Orbital period'],
    ['diameter', 'Diameter'],
    ['rotation_period', 'Rotation period'],
    ['surface_water', 'Surface water'],
  ];

  const usedColumns = filters.map((filter) => 'numericValues' in filter && filter.numericValues.column);

  const availableSelectors = selectors.filter((selector) => (
    selector[0] === '' || !(usedColumns.includes(selector[0])) || selector[0] === actualColumn));

  return (
    <select
      data-testid="column-selector"
      onChange={(e) => setFilter(e, filterIndex)}
      id="column"
      value={actualColumn}
    >
      {availableSelectors.map(
        ([value, label]) => <option key={`${label}_selector`} value={value}>{label}</option>,
      )}
    </select>
  );
}

function renderComparisonOptions(filterIndex, actualComparison, setFilter) {
  return (
    <select
      onChange={(e) => setFilter(e, filterIndex)}
      id="comparison"
      value={actualComparison}
    >
      <option label=" " value="" defaultValue />
      <option value="lesserThan">{'<'}</option>
      <option value="equalsThan">=</option>
      <option value="higherThan">{'>'}</option>
    </select>

  );
}

function renderNumberInput(filterIndex, actualValue, setFilter) {
  return (
    <input
      onChange={(e) => setFilter(e, filterIndex)}
      type="number"
      id="value"
      width="100px"
      value={actualValue}
    />
  );
}

function renderRemoveButton(filterIndex, filters, setFilters) {
  const [, ...numericFilters] = filters;
  const removeFilterRow = () => numericFilters.length > 1 && setFilters(
    [...filters.filter((filter, index) => index !== filterIndex)],
  );

  return (
    <button
      type="button"
      onClick={() => removeFilterRow()}
      id="remove"
    >
      X
    </button>
  );
}


export default function NumericFilters() {
  const { filters: [filters, setFilters] } = useContext(PlanetsDBContext);
  const setFilter = (event, filterIndex) => setFilters(
    filters.map((filter, index) => {
      if ('numericValues' in filter && filterIndex === index) {
        return {
          numericValues:
          { ...filter.numericValues, [event.target.id]: event.target.value },
        };
      }
      return filter;
    }),
  );

  const numericFilters = filters.filter((filter) => 'numericValues' in filter);

  return (
    numericFilters.map(({
      numericValues:
      { column: actualColumn, comparison: actualComparison, value: actualValue },
    }, index) => {
      const filterIndex = index + 1;
      return (
        <div key={`row_${filterIndex + 1}`}>
          {renderColumnsOptions(filterIndex, actualColumn, filters, setFilter)}
          {renderComparisonOptions(filterIndex, actualComparison, setFilter)}
          {renderNumberInput(filterIndex, actualValue, setFilter)}
          {renderRemoveButton(filterIndex, filters, setFilters)}
        </div>
      );
    })
  );
}
