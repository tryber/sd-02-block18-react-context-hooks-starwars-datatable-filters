import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function verifySelect(filters, value) {
  const exists = filters.find((filterObj) => filterObj.column === value);
  if (exists) return false;
  return true;
}

function ColumnFilterSelect() {
  const {
    numericFilters,
    setFilterObj,
    numericFilterObj: { comparison, value },
  } = useContext(StarWarsContext);
  return (
    <select name="cl" onChange={(e) => setFilterObj({ column: e.target.value, comparison, value })}>
      <option value="">Selecionar Opção</option>
      {verifySelect(numericFilters, 'population') && <option value="population">População</option>}
      {verifySelect(numericFilters, 'orbital_period') && <option value="orbital_period">Duração Orbital</option>}
      {verifySelect(numericFilters, 'diameter') && <option value="diameter">Diâmetro</option>}
      {verifySelect(numericFilters, 'rotation_period') && <option value="rotation_period">Duração da Rotação</option>}
      {verifySelect(numericFilters, 'surface_water') && <option value="surface_water">Superfície da Água</option>}
    </select>
  );
}

export default ColumnFilterSelect;
