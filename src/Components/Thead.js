import React, { useContext } from 'react';
import SwContext from '../Context';

const Thead = () => {
  const { planetsToFilter } = useContext(SwContext);
  const tableTitle = planetsToFilter
    ? Object.keys(planetsToFilter[0])
    : [];

  return (
    <thead>
      <tr>
        {tableTitle.map((title) => <th>{title}</th>)}
      </tr>
    </thead>
  );
};

export default Thead;
