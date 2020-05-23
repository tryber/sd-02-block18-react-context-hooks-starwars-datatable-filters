import React, { useContext, useState } from 'react';
import SwContext from '../Context';

const Thead = () => {
  const { planets, setSortFilters } = useContext(SwContext);
  const tableTitle = planets && Object.keys(planets[0]);
  const [asc, setAsc] = useState('▲');
  const changeOrder = (char, order, title) => {
    setAsc(char);
    setSortFilters({ column: title, order });
  };
  return (
    <thead>
      <tr key="Row of column values">
        {tableTitle.map((title) => (title !== 'residents'
          ? (
            <th key={`${title} column`}>
              {title}
              <button
                type="button"
                onClick={() => (asc === '▲'
                  ? changeOrder('▼', 'DESC', title)
                  : changeOrder('▲', 'ASC', title)
                )}
              >
                {asc}
              </button>
            </th>
          )
          : null))}
      </tr>
    </thead>
  );
};

export default Thead;
