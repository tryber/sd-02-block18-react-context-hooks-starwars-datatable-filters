import React, { useContext } from 'react';

import starWarsContext from '../context/Context';

function FilterName() {
  const { filterNameFunc } = useContext(starWarsContext);

  const handleChange = (e) => {
    const name = e.target.value;
    filterNameFunc(name);
  };

  return (
    <div>
      <label htmlFor="inputName">Planet name:</label>
      <input
        id="inputName"
        data-testid="inputName"
        type="text"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default FilterName;
