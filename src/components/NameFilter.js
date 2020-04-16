import React, { useContext } from 'react';
import { Context } from '../context/Provider';

export default function NameFilter() {
  const { filters: [{ name: valueInput }], changeNameFilter } = useContext(Context);

  return (
    <div className="filter">
      <input
        placeholder="Search by name"
        value={valueInput}
        onChange={changeNameFilter}
      />
    </div>
  );
};
