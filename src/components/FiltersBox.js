import React, { useContext } from 'react';

import FilterContext from '../contexts/FilterContext';
import FunctionContext from '../contexts/FunctionContext';

const renderInputByName = (name, setName) => {
  return (
    <input
      type="input"
      data-testid="input-name"
      value={name}
      onChange={({ target }) => setName(target.value)}
    />
  );
};

const FiltersBox = () => {
  const { filters: [{ name }] } = useContext(FilterContext);
  const { setName } = useContext(FunctionContext);

  return (
    <div>
      {renderInputByName(name, setName)}
    </div>
  );
};

export default FiltersBox;
