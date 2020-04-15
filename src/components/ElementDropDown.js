import React from 'react';
import PropTypes from 'prop-types';

function ElementDropDown(props) {
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

ElementDropDown.propTypes = {
  param: PropTypes.string.isRequired,
  call: PropTypes.func.isRequired,
};

export default ElementDropDown;
