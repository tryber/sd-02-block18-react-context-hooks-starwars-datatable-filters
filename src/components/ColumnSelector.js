import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const ColumnSelector = () => {
  const { filters, numericFilter, setNumericFilter } = useContext(StarWarsContext);
  const columns = ['rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population'];
  const selectedColumn = filters.map((el) => (
    el.numericValues ? el.numericValues.column : false));
  return (
    <div>
      <span className="selector-label">Choose a column:</span>
      <select
        name="column"
        onChange={({
          target: { name, value },
        }) => setNumericFilter({ ...numericFilter, [name]: value })}
        required
      >
        <option value="" label=" " />
        {columns.map((element) => (
          selectedColumn.includes(element)
            ? false
            : <option value={element} key={element}>{element.replace('_', ' ')}</option>
        ))}
      </select>
    </div>
  );
};

export default ColumnSelector;
