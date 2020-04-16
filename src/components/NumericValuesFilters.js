import React, { useContext } from 'react';
import { acertaTexto } from './Table';
import { Context } from '../context/Provider';

function verificaEntradasVazias(array) {
  return array.every((item, index) => (
    item !== '' || index === array.length - 1
  ));
}

function addFilter(i, filters, changeNumericValuesFilters, deleteNumericValuesFilters) {
  const arrayColumns = filters.slice(1).map((item) => item.numericValues.column);

  const newArrayColumns = arrayColumns.slice(0, i - 1);
  const allColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const columnsRestantes = allColumns.filter((item) => !newArrayColumns.includes(item));

  const objectStates = filters.slice(1).reduce((acc, current, index) => ({
    ...acc,
    [`valueSelectedColumn${index + 1}`]: current.numericValues.column,
    [`valueSelectedComparison${index + 1}`]: current.numericValues.comparison,
    [`valueNumber${index + 1}`]: current.numericValues.value,
  }), {});

  return (
    <div id={i} className="filter" key={i}>
      <select name="column" onChange={changeNumericValuesFilters} value={objectStates[`valueSelectedColumn${i}`]}>
        <option value="" disabled>Select column</option>
        {columnsRestantes.map((item) => (
          <option key={item} value={item}>{acertaTexto(item)}</option>
        ))}
      </select>
      <select name="comparison" onChange={changeNumericValuesFilters} value={objectStates[`valueSelectedComparison${i}`]}>
        <option value=">">greater than</option>
        <option value="<">less than</option>
        <option value="===">equal to</option>
      </select>
      <input type="number" placeholder="Enter a number" name="value" onChange={changeNumericValuesFilters} value={objectStates[`valueNumber${i}`]} />
      <button type="button" onClick={deleteNumericValuesFilters}>X</button>
    </div>
  );
}

export default function NumericValuesFilters() {
  const { filters, changeNumericValuesFilters, deleteNumericValuesFilters } = useContext(Context);

  function addMoreAndMoreFilters() {
    const arrayValues = filters.slice(1).map((item) => item.numericValues.value);
    const arrayColumns = filters.slice(1).map((item) => item.numericValues.column);

    let numericFilters;

    if (verificaEntradasVazias(arrayValues) && verificaEntradasVazias(arrayColumns)) {
      numericFilters = (
        <div>
          {arrayValues.map((item, i) => (
            addFilter(i + 1, filters, changeNumericValuesFilters, deleteNumericValuesFilters)
          ))}
        </div>
      );
    } else {
      const newArrayValues = arrayValues.slice(0, arrayValues.length - 1);

      numericFilters = (
        <div>
          {newArrayValues.map((item, i) => (
            addFilter(i + 1, filters, changeNumericValuesFilters, deleteNumericValuesFilters)
          ))}
        </div>
      );
    }

    return numericFilters;
  }

  return (
    <div>
      {addMoreAndMoreFilters()}
    </div>
  );
};
