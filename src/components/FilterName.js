import React, { useContext } from 'react';

import FilterContext from '../context/Context';

function FilterName() {
  const { filterNameFunc } = useContext(FilterContext);

  const handleChange = (e) => {
    const name = e.target.value;
    filterNameFunc(name);
  };

  return (
    <div>
      <label>Planet name:</label>
      <input
        data-testid="inputName"
        type="text"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default FilterName;
