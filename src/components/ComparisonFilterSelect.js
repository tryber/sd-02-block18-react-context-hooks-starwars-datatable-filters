import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function ComparisonFilterSelect() {
  const { setFilterObj, numericFilterObj: { column, value } } = useContext(StarWarsContext);
  return (
    <select
      name="type"
      defaultValue=""
      onChange={(e) => setFilterObj({ column, comparison: e.target.value, value })}
    >
      <option value="">Selecionar Opção</option>
      <option value="bigger">Maior que</option>
      <option value="less">Menor que</option>
      <option value="equal">Igual a</option>
    </select>
  );
}

export default ComparisonFilterSelect;
