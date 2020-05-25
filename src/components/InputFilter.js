import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const InputFilter = () => {
  const contextValue = useContext(StarWarsContext);

  return (
    <div>
      <input
        type="text"
        className="input-SW"
        placeholder="Pesquise um planeta"
        data-testid="name-input-filter"
        onChange={(event) => contextValue.setInputFilter(event.target.value)}
      />
    </div>
  );
};

export default InputFilter;
