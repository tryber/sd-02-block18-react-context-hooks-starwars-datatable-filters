import React from 'react';
import PropTypes from 'prop-types';

function DropDownElement(props) {
  const { param, call } = props;

  const clickHandle = (e) => {
    call(e);
  };

  return (
    <button
      key={param}
      type="button"
      name={param}
      onClick={(e) => clickHandle(e)}
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
