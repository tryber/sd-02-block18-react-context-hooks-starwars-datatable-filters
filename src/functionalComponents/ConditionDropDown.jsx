import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const ConditionDropDown = () => {
  const { updateCondition } = useContext(StarWarsContext);
  return (
    <form>
      <label htmlFor="conditionType">
        <select
          id="conditionType"
          name="condition"
          onChange={(e) =>
          updateCondition(e.target.value)}
        >
          <option value="none" hidden>Choose Option</option>
          <option value="Maior que">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
      </label>
    </form>
  );
};

export default ConditionDropDown;
