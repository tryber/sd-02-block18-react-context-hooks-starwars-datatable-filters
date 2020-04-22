import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';


const SelectDropDown = () => {
  const { updateDropDown, arrDrop } = useContext(StarWarsContext);
  return (
    <form>
      <label htmlFor="filterType">
        <select
          id="filterType"
          name="column"
          onChange={(e) => updateDropDown(e.target.value)}
        >
          <option value="none" hidden>Choose Option</option>
          {
            arrDrop.map((arr) => (
              <option key={arr} value={arr} name={arr.slice(0,4) + 'On'} hidden={(arr.slice(0,4) + 'On' ? '': 'none')}>{arr}</option>
            ))
          }
        </select>
      </label>
    </form>
  );
}

export default SelectDropDown;
