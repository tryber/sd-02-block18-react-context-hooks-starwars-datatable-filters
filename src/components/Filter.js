import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import starWarsContext from '../context/Context';
import Dropdown from './Dropdown';
import FilterCondition from './FilterCondition';

const Filter = (props) => {
  const { index, removeFilter2 } = props;
  const {
    typeParam,
    filterTypeFunc,
    filterConditionFunc,
  } = useContext(starWarsContext);
  const conditions = ['Maior que', 'Menor que', 'Igual a'];

  const handleClick = () => {
    removeFilter2(index);
  };

  const renderDropDownType = () => (
    <Dropdown
      name="Type:"
      arr={typeParam}
      func={filterTypeFunc}
      index={index}
      testid="type"
    />
  );

  const renderDropDownCond = () => (
    <Dropdown
      name="Condition:"
      arr={conditions}
      func={filterConditionFunc}
      index={index}
      testid="condition"
    />
  );

  return (
    <div className="filter" data-testid="filter">
      <button type="button" onClick={() => handleClick()}>
        <span className="material-icons">
          close
        </span>
      </button>
      {renderDropDownType()}
      {renderDropDownCond()}
      <FilterCondition index={index} />
    </div>
  );
};

Filter.propTypes = {
  index: PropTypes.number.isRequired,
  removeFilter2: PropTypes.func.isRequired,
};

export default Filter;
