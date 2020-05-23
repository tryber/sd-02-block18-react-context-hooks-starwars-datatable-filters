import React, { useContext } from 'react';
import SwContext from '../Context';

const ShowSort = () => {
  const { sortFilters, setSortFilters } = useContext(SwContext);
  return (
    <div>
      {sortFilters.column
        ? (
          <div className="Return_Filters-sort">
            <p
              data-testid="show-column-sorted"
              className="Return_Filter-text"
            >
              {`${sortFilters.column} | ${sortFilters.order}`}
            </p>
            <button
              className="Return_Filter-button"
              data-testid="show-sorted-value"
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
