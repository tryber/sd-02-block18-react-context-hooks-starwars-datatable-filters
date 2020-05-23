import React, { useContext } from 'react';
import SwContext from '../Context';

const ComparisonSelect = () => {
  const { setComparison } = useContext(SwContext);
  const comparativeValues = ['bigger_than', 'less_than', 'equal_to'];
  return (
    <select
      name="comparison"
      onChange={(element) => setComparison(element.target.value)}
      key="comparativeValue"
    >
      <option hidden>Select a comparison</option>
      {comparativeValues.map((comparativeValue) => (
        <option key={comparativeValue} value={comparativeValue}>{comparativeValue}</option>
      ))}
    </select>
  );
};

export default ComparisonSelect;
