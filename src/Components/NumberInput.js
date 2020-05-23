import React, { useContext } from 'react';
import { DebounceInput } from 'react-debounce-input';
import SwContext from '../Context';

const NumberInput = () => {
  const {
    filters,
    setFilters,
    column,
    comparison,
  } = useContext(SwContext);

  const toFilterArray = (value) => (
    column !== '' && comparison !== '' && value > -1
      ? setFilters([...filters, {
        column,
        comparison,
        value,
      }])
      : alert('Preencha todos os campos')
  );
  return (
    <DebounceInput
      minLength={1}
      debounceTimeout={800}
      onChange={(e) => toFilterArray(e.target.value)}
    />
  );
};

export default NumberInput;
