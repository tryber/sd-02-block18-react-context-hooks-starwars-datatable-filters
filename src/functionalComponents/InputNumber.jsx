import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';


const InputNumber = () => {
  const { value, updateValue } = useContext(StarWarsContext);
  return (
    <div>
      <input
        type="number"
        name="value"
        value={value}
        onChange={(e) => updateValue(e)}
      />
    </div>
  );
};

export default InputNumber;
