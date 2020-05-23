import React, { useContext } from 'react';
import SwContext from '../Context';

const ShowSort = () => {
  const { sortFilters, setSortFilters } = useContext(SwContext);
  return (
    <div>
      {sortFilters.column
        ? (
          <div className="Return_Filters-sort">
            <p className="Return_Filter-text">{`${sortFilters.column} | ${sortFilters.order}`}</p>
            <button
              className="Return_Filter-button"
              type="button"
              onClick={() => setSortFilters({})}
            >
              X
            </button>
          </div>
        ) : <p>No Sorted</p>}
    </div>
  );
};

export default ShowSort;
