import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PlanetsDBContext } from '../context/PlanetsDBContext';


function RenderColumnsOptions({ filterIndex, actualColumn, onChange }) {
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
      onChange={(e) => onChange(e, filterIndex)}
      id="column"
      value={actualColumn}
    >
      {availableSelectors.map(
        ([value, label]) => <option key={`${label}_selector`} value={value}>{label}</option>,
      )}
    </select>
  );
}

function renderComparisonOptions(filterIndex, comparison, onChange) {
  return (
    <select
      onChange={(e) => onChange(e, filterIndex)}
      id="comparison"
      value={comparison}
    >
      <option label=" " value="" defaultValue />
      <option value="lesserThan">{'<'}</option>
      <option value="equalsThan">=</option>
      <option value="higherThan">{'>'}</option>
    </select>

  );
}

function renderNumberInput(filterIndex, value, onChange) {
  return (
    <input
      onChange={(e) => onChange(e, filterIndex)}
      type="number"
      id="value"
      width="100px"
      value={value}
    />
  );
}

function renderRemoveButton(filterIndex, onChange) {
  return (
    <button
      type="button"
      onClick={(e) => onChange(e, filterIndex)}
      id="remove"
    >
      X
    </button>
  );
}


export default function NumericFilters() {
  const { filters: [filters, setFilters] } = useContext(PlanetsDBContext);

  const onChange = (event, filterIndex) => setFilters(
    filters.map((filter, index) => {
      if ('numericValue' in filter && filterIndex + 1 === index) {
        return {
          numericValue:
          { ...filter.numericValue, [event.target.id]: event.target.value },
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
              onChange={onChange}
            />

            {/* {renderComparisonOptions(filterIndex, comparison, onChange)}

            {renderNumberInput(filterIndex, value, onChange)}

            { renderRemoveButton(filterIndex, onChange)} */}
          </div>
        );
      }
      return null;
    })
  );
}
