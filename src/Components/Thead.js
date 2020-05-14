import React, { useContext } from 'react';
import SwContext from '../Context';

const Thead = () => {
  const { planets } = useContext(SwContext);
  const tableTitle = planets
    ? Object.keys(planets[0])
    : [];

  return (
    <thead>
      <tr key="Row of column values">
        {tableTitle.map((title) => (title !== 'residents'
          ? <th key={`${title} column`}>{title}</th>
          : null))}
      </tr>
    </thead>
  );
};

export default Thead;
