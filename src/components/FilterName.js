import React, { useContext } from 'react';

import StarWarsContext from '../context/StarWarsContext';

function FilterName() {
  const { filterNameFunc } = useContext(StarWarsContext);

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
