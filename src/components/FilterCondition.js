import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './Filter.css';
import FilterContext from '../context/Context';

function FilterCondition(props) {
  const { index } = props;
  const { filterNumberFunc } = useContext(FilterContext);

  const handleChange = (e) => {
    const name = e.target.value;
    filterNumberFunc(name, index);
  };

  return (
    <div className="comp_condition">
      <label>Number:</label>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

FilterCondition.propTypes = {
  index: PropTypes.number.isRequired,
};

export default FilterCondition;
