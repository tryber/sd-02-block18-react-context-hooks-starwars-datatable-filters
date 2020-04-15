import React from 'react';

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

export default ElementDropDown;
