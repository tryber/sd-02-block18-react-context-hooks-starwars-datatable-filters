import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import StarWarsContext from '../context/StarWarsContext';
import Dropdown from './Dropdown';
import FilterCondition from './FilterCondition';

const conditions = ['Maior que', 'Menor que', 'Igual a'];

const handleClick = (removeFilter2, index) => {
  removeFilter2(index);
};

const renderDropDownType = (index, typeParam, filterTypeFunc) => (
  <Dropdown
    name="Type:"
    arr={typeParam}
    func={filterTypeFunc}
    index={index}
    testid="type"
  />
);

const renderDropDownCond = (index, filterConditionFunc) => (
  <Dropdown
    name="Condition:"
    arr={conditions}
    func={filterConditionFunc}
    index={index}
    testid="condition"
  />
);

function Filter(props) {
  const {
    filters, typeParam, filterTypeFunc, filterConditionFunc,
  } = useContext(StarWarsContext);
  const [autoAddFilter, setAutoAddFilter] = useState(false);
  const { index, removeFilter2, add } = props;

  useEffect(() => { autoAddFilter && add() }, [autoAddFilter]);

  useEffect(() => {
    const { numericValues = {} } = { [filters.filters[index]]: undefined };
    const { column = '', comparison = '', value = '' } = numericValues;
    if (column && comparison && value) setAutoAddFilter(true);
  }, [filters]);
  
  return (
    <div className="filter" data-testid="filter">
      <button type="button" onClick={() => handleClick(removeFilter2, index)}>
        <span className="material-icons" data-testid={`${index}-close`}>
          close
        </span>
      </button>
      {renderDropDownType(index, typeParam, filterTypeFunc)}
      {renderDropDownCond(index, filterConditionFunc)}
      <FilterCondition index={index} />
    </div>
  );
}

Filter.propTypes = {
  index: PropTypes.number.isRequired,
  removeFilter2: PropTypes.func.isRequired,
};

export default Filter;
