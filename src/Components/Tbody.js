import React, { useContext } from 'react';
import SwContext from '../Context';

const Tbody = () => {
  const { planetsToFilter } = useContext(SwContext);
  return (
    <tbody>
      {planetsToFilter.map((planet) => (
        <tr key={`${planet.name} row values`}>
          {Object.values(planet).map((value, index) => (
            Object.keys(planet)[index] !== 'residents'
              ? <td key={`${value} cell`}>{value}</td>
              : null
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
