import React, { useContext } from 'react';
import SwContext from '../Context';

const ShowFilterNumber = () => {
  const { filters, setFilters } = useContext(SwContext);
  const removeFilters = (filter) => {
    console.log('entrou');
    const copyFilters = [...filters];
    const i = copyFilters.indexOf(filter);
    const toSetFilters = copyFilters.slice(0, i)
      .concat(copyFilters.slice(i + 1));
    setFilters(toSetFilters);
  };
  return (
    <div className="Return_Filters-father">
      {filters.map((filter) => (
        <div
          className="Return_Filters-data"
          key={`show filter ${filter.column}`}
        >
          <p className="Return_Filter-text">{`${filter.column} | ${filter.comparison} | ${filter.value}`}</p>

          <button
            className="Return_Filter-button"
            type="button"
            onClick={() => removeFilters(filter)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowFilterNumber;
