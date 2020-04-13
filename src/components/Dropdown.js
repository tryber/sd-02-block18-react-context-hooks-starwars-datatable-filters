import React from 'react';
import PropTypes from 'prop-types';

import './DropDown.css';

function DropDown(props) {
  let list;
  let selected;
  let dropped = false;
  const {
    arr, func, name, index, testid
  } = props;

  const dropDown = () => {
    dropped = !dropped;
    if (dropped) {
      list.style.display = 'none';
    } else {
      list.style.display = 'flex';
    }
  };

  const clickHandle = (e) => {
    const type = e.target.name;
    selected.innerHTML = type;
    func(type, index);
    dropDown();
  };

  return (
    <div className="comp_dropdown" data-testid={testid}>
      <label>{name}</label>
      <div className="selected">
        <button
          type="button"
          onClick={() => dropDown()}
        >
          <p ref={(node) => { selected = node; }} />
        </button>
      </div>
      <div className="list" ref={(node) => { list = node; }}>
        {arr.map((param) => (
          <button
            key={param}
            type="button"
            name={param}
            onClick={(e) => clickHandle(e)}
          >
            {param}
          </button>
        ))}
      </div>
    </div>
  );
}

DropDown.propTypes = {
  arr: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  func: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default DropDown;
