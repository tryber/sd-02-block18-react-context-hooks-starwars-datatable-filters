import React, { useState, useContext } from 'react';
import shortid from 'shortid';

import StarWarsContext from '../context/StarWarsContext';
import FilterName from './FilterName';
import Filter from './Filter';

function render1(add, typeParam) {
  return (
    <React.Fragment>
      {(typeParam.length > 0) ? <button
        type="button"
        onClick={() => add()}
      >
        Add filter
      </button> : <div />}
    </React.Fragment>
  );
}

function Filters() {
  const { addFilter, removeFilter, filters, setTypeParam, typeParam } = useContext(StarWarsContext);
  const [filters2, setFilters2] = useState([shortid.generate()]);
  const add = () => {
    setFilters2([...filters2, shortid.generate()]);
    addFilter();
  };

  const removeFilter2 = (index) => {
    setTypeParam([...typeParam, filters.filters[index].numericValues.column]);
    filters2.splice(index - 2, 1);
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
          add={add}
        />
      ))}
      {render1(add, typeParam)}
    </div>
  );
}

export default Filters;
