import React, { useContext, useState } from 'react';

import FilterContext from '../contexts/FilterContext';
import FunctionContext from '../contexts/FunctionContext';
import FilterList from './FiltersList';

const renderInputByName = (name, setName) => (
  <input
    type="text"
    data-testid="input-name"
    value={name}
    placeholder="Digite um nome :"
    onChange={({ target }) => setName(target.value)}
  />
);


const renderInputByNumber = (valueNumber, setLocalNumericValues) => (
  <input
    type="number"
    data-testid="inputNumberValue"
    value={valueNumber}
    placeholder="Digite um numero :"
    onChange={({ target: { value } }) => setLocalNumericValues((array) => [
      {
        ...array[0],
        value,
      },
    ])}
  />
);

const renderInputByComparison = (comparison, setLocalNumericValues) => {
  const comparisonValues = ['maior que', 'menor que', 'igual a'];
  return (
    <select
      value={comparison}
      data-testid="select-comparison"
      name="comparison"
      onChange={({ target: { value } }) => setLocalNumericValues((array) => [
        {
          ...array[0],
          comparison: value,
        },
      ])}
    >
      <option value="" disabled>Escolha um comparador</option>
      {
        comparisonValues.map((dropdown) => (
          <option key={dropdown} value={dropdown}>{dropdown}</option>
        ))
      }
    </select>
  );
};

const verifyColumn = (columnSelect, numericValues) => (
  numericValues.some(({ column }) => column === columnSelect)
);

const renderInputByColumn = (column, setLocalNumericValues, numericValues) => {
  const columnValues = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  return (
    <select
      value={column}
      data-testid="select-column"
      name="column"
      onChange={({ target: { value } }) => setLocalNumericValues((array) => [
        {
          ...array[0],
          column: value,
        },
      ])}
    >
      <option value="" disabled>Escolha uma coluna</option>
      {
        columnValues.map((dropdown) => (
          verifyColumn(dropdown, numericValues)
          || <option key={dropdown} value={dropdown}>{dropdown}</option>
        ))
      }
    </select>
  );
};

const renderFilterButton = (
  rest,
  setNumericValues,
  numericValues,
  setLocalNumericValues,
  setShowFiltersList,
) => (
  <button
    type="button"
    data-testid="filter-button"
    onClick={() => {
      setNumericValues([...rest, ...numericValues]);
      setLocalNumericValues([
        { column: '', comparison: '', value: '' },
      ]);
      setShowFiltersList(true);
    }}
  >
    Clique para filtrar
  </button>
);

const FiltersBox = () => {
  const { filters: [{ name }, ...rest] } = useContext(FilterContext);
  const { setName, setNumericValues } = useContext(FunctionContext);
  const [numericValues, setLocalNumericValues] = useState([
    { column: '', comparison: '', value: '' },
  ]);

  const [showFiltersList, setShowFiltersList] = useState(false);

  return (
    <div>
      {renderInputByName(name, setName)}
      {(rest.length === 5)
        || renderInputByColumn(numericValues[0].column, setLocalNumericValues, rest)}
      {(rest.length === 5)
        || renderInputByComparison(numericValues[0].comparison, setLocalNumericValues)}
      {(rest.length === 5) || renderInputByNumber(numericValues[0].value, setLocalNumericValues)}
      {(numericValues[0].column && numericValues[0].comparison && numericValues[0].value)
        && renderFilterButton(
          rest,
          setNumericValues,
          numericValues,
          setLocalNumericValues,
          setShowFiltersList,
        )}
      {showFiltersList && <FilterList />}
    </div>
  );
};

export default FiltersBox;
