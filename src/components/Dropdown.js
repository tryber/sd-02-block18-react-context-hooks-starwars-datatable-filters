import React from 'react';
import PropTypes from 'prop-types';

import ElementDropDown from './ElementDropDown';
import './DropDown.css';


function DropDown(props) {
  const {
    arr, func, name, index, testid,
  } = props;

  let list;
  let selected;
  let dropped = false;

  const toggle = () => {
    dropped = !dropped;
    list.style.display = (dropped) ? 'none' : 'flex';
  };

  const call = (e) => {
    const type = e.target.name;
    func(type, index);
    selected.innerHTML = type;
    toggle();
  };

  const renderList = () => (
    <div className="list" ref={(node) => { list = node; }}>
      {arr.map((param) => (
        <ElementDropDown param={param} call={call} />
      ))}
    </div>
  );

  return (
    <div className="comp_dropdown" data-testid={testid}>
      <p className="selectedTag">{name}</p>
      <div className="selected">
        <button type="button" onClick={() => toggle()}>
          <p name={`tag${testid}`} ref={(node) => { selected = node; }} />
        </button>
      </div>
      {renderList()}
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
  testid: PropTypes.string.isRequired,
};

export default DropDown;
