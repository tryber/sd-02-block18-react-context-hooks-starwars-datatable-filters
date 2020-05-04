import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const ComparisonSelector = () => {
  const { numericFilter, setNumericFilter } = useContext(StarWarsContext);
  return (
    <div>
      <span className="selector-label">Choose a comparison:</span>
      <select
        name="comparison"
        onChange={({
          target: { name, value },
        }) => setNumericFilter({ ...numericFilter, [name]: value })}
        required
      >
        <option value="" label=" " />
        <option value="Maior que">Maior que</option>
        <option value="Menor que">Menor que</option>
        <option value="Igual a">Igual a</option>
      </select>
    </div>
  );
};

export default ComparisonSelector;
