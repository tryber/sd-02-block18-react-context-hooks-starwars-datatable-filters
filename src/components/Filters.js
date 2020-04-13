import React, { useState, useContext } from 'react';
import shortid from 'shortid';

import starWarsContext from '../context/Context';
import FilterName from './FilterName';
import Filter from './Filter';

function Filters() {
  const { addFilter, removeFilter } = useContext(starWarsContext);
  const [filters2, setFilters] = useState([shortid.generate()]);

  const handleClick = () => {
    setFilters([...filters2, shortid.generate()]);
    addFilter();
  };

  const removeFilter2 = (index) => {
    filters2.splice(index - 1, 1);
    setFilters([...filters2]);
    removeFilter(index);
  };

  return (
    <div className="filters" data-testid="filters">
      <FilterName />
      {filters2.map((filter, inx) => (
        <Filter
          key={filter}
          index={inx + 1}
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
