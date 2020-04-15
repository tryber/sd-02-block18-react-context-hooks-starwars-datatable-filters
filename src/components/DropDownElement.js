import React from 'react';
import PropTypes from 'prop-types';

function DropDownElement(props) {
  const { param, call } = props;

  return (
    <button
      key={param}
      type="button"
      name={param}
      onClick={(e) => call(e)}
    >
      {param}
    </button>
  );
}

DropDownElement.propTypes = {
  param: PropTypes.string.isRequired,
  call: PropTypes.func.isRequired,
};

export default DropDownElement;
