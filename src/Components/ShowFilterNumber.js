import React, { useContext } from 'react';
import SwContext from '../Context';

const removeButton = (filter, removeFilters) => (
  <button
    className="Return_Filter-button"
    type="button"
    onClick={() => removeFilters(filter)}
  >
    X
  </button>
);

const ShowFilterNumber = () => {
  const {
    filters,
    setFilters,
    setColumns,
    columns,
  } = useContext(SwContext);
  const removeFilters = (filter) => {
    const copyFilters = [...filters];
    const i = copyFilters.indexOf(filter);
    const toSetFilters = copyFilters.slice(0, i).concat(copyFilters.slice(i + 1));
    setFilters(toSetFilters);
    setColumns([...columns, filter.column]);
  };
  return (
    <div className="Return_Filters-father">
      {filters.map((filter) => (
        <div
          className="Return_Filters-data"
          key={`show filter ${filter.column}`}
        >
          <p className="Return_Filter-text">{`${filter.column} | ${filter.comparison} | ${filter.value}`}</p>
          {removeButton(filter, removeFilters)}
        </div>
      ))}
    </div>
  );
};

export default ShowFilterNumber;
