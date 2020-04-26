import React, { useState, useContext, useEffect } from 'react';
import shortid from 'shortid';

import StarWarsContext from '../context/StarWarsContext';
import FilterName from './FilterName';
import Filter from './Filter';

function Filters() {
  const { addFilter, removeFilter } = useContext(StarWarsContext);
  const [filters2, setFilters2] = useState([shortid.generate()]);
  
  const handleClick = () => {
    setFilters2([...filters2, shortid.generate()]);
    addFilter();
  };

  const removeFilter2 = (index) => {
    filters2.splice(index - 1, 1);
    setFilters2([...filters2]);
    removeFilter(index);
  };

  return (
    <div className="filters" data-testid="filters">
      <FilterName />
      {filters2.map((filter, inx) => (
        <Filter
          key={filter}
          index={inx + 2}
          removeFilter2={removeFilter2}
        />
      ))}
      <button
        type="button"
        onClick={() => handleClick()}
      >
        Add filter
      </button>
    </div>
  );
}

export default Filters;
