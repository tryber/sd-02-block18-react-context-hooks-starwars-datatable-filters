import React, { useContext } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';


function RenderColumnsOptions({ filterIndex, actualColumn, setFilter }) {
  const { filters: [filters] } = useContext(PlanetsDBContext);

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

function RenderComparisonOptions({ filterIndex, actualComparison, setFilter }) {
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

function RenderNumberInput({ filterIndex, actualValue, setFilter }) {
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

function RenderRemoveButton({ filterIndex, setFilter }) {
  return (
    <button
      type="button"
      onClick={(e) => setFilter(e, filterIndex)}
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

  return (
    filters.map((filter, filterIndex) => {
      if ('numericValues' in filter) {
        const {
          numericValues:
          { column: actualColumn, comparison: actualComparison, value: actualValue },
        } = filter;
        return (
          <div key={`${filter}_${filterIndex + 1}`}>
            <RenderColumnsOptions
              filterIndex={filterIndex}
              actualColumn={actualColumn}
              setFilter={setFilter}
            />

            <RenderComparisonOptions
              filterIndex={filterIndex}
              actualComparison={actualComparison}
              setFilter={setFilter}
            />

            <RenderNumberInput
              filterIndex={filterIndex}
              actualValue={actualValue}
              setFilter={setFilter}
            />

            <RenderRemoveButton filterIndex={filterIndex} setFilter={setFilter} />
          </div>
        );
      }
      return null;
    })
  );
}
