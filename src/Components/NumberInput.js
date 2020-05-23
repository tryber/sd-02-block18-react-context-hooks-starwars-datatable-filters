import React, { useContext } from 'react';
import { DebounceInput } from 'react-debounce-input';
import SwContext from '../Context';

const inputWithDebounce = (toFilterArray) => (
  <DebounceInput
    data-testid="value-insert"
    type="number"
    minLength={1}
    onFocus={(e) => e.target.value = ""}
    debounceTimeout={800}
    onChange={(e) => toFilterArray(e.target.value)}
  />
);

const NumberInput = () => {
  const {
    filters,
    setFilters,
    column,
    setColumn,
    comparison,
    columns,
    setColumns,
  } = useContext(SwContext);

  const setAndRemove = (value) => {
    const copyColumns = [...columns];
    const i = copyColumns.indexOf(column);
    const toSetColumns = copyColumns.slice(0, i).concat(copyColumns.slice(i + 1));
    setFilters([...filters, {
      column,
      comparison,
      value,
    }]);
    setColumns(toSetColumns);
    setColumn('');
  };

  const toFilterArray = (value) => (
    column !== '' && comparison !== '' && value > -1
      ? setAndRemove(value) : alert('Preencha todos os campos')
  );

  return inputWithDebounce(toFilterArray);
};

export default NumberInput;
