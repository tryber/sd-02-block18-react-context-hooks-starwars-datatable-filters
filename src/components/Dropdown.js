import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DropDownElement from './DropDownElement';
import './DropDown.css';

function DropDown(props) {
  const {
    arr, func, name, index, testid,
  } = props;
  const [selected, setSelected] = useState(arr[0]);
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    func(arr[0], index);
  }, []);

  const call = (e) => {
    const type = e.target.name;
    setSelected(type);
    func(type, index);
    setDropped((currDropped) => !currDropped);
  };

  return (
    <div className="comp_dropdown" data-testid={testid}>
      <p className="selectedTag">{name}</p>
      <div className="selected">
        <button type="button" onClick={() => setDropped((currDropped) => !currDropped)}>
          <p name={`tag${testid}`}>{selected}</p>
        </button>
      </div>
      <div className="list" style={(dropped) ? { display: 'flex' } : { display: 'none' } }>
        {arr.map((param) => (<DropDownElement key={param} param={param} call={call} />))}
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
  index: PropTypes.number,
  testid: PropTypes.string.isRequired,
};

DropDown.defaultProps = {
  index: undefined,
}

export default DropDown;
