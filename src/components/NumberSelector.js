import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const NumberSelector = () => {
  const { numericFilter, setNumericFilter } = useContext(StarWarsContext);
  return (
    <div className="group number-selector">
      <input
        type="number"
        name="value"
        onChange={({
          target: { name, value },
        }) => setNumericFilter({ ...numericFilter, [name]: value })}
        required
        id="number-bar"
      />
      <span className="highlight" />
      <span className="bar" />
      <label htmlFor="number-bar">Type a number</label>
    </div>
  );
};

export default NumberSelector;
