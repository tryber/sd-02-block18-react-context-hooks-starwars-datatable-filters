import React from 'react';
import PropTypes from 'prop-types';

import './DropDown.css';

const DropDown = (props) => {
  let list;
  let selected;
  let dropped = false;
  const {
    arr, func, name, index, testid,
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

  const renderList = () => (
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
  );


  return (
    <div className="comp_dropdown" data-testid={testid}>
      <p className="selectedTag">{name}</p>
      <div className="selected">
        <button
          type="button"
          onClick={() => dropDown()}
        >
          <p name={`tag${testid}`} ref={(node) => { selected = node; }} />
        </button>
      </div>
      {renderList()}
    </div>
  );
};

DropDown.propTypes = {
  arr: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  func: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};

export default DropDown;
