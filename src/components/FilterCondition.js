import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './Filter.css';
import StarWarsContext from '../context/StarWarsContext';

function FilterCondition(props) {
  const { index } = props;
  const { filterNumberFunc } = useContext(StarWarsContext);

  const handleChange = (e) => {
    const name = e.target.value;
    filterNumberFunc(name, index);
  };

  return (
    <div className="comp_condition">
      <label htmlFor="inputCondition">Number:</label>
      <input
        id="inputCondition"
        name="inputCondition"
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
