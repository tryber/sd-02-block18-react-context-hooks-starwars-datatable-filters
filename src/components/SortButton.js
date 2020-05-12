import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StarWarsContext } from '../context/StarWarsContext';

const SortButton = ({ currentColumn }) => {
  const {
    filters, sortColumns, setSortColumns, filteredData, data, setFilteredData,
  } = useContext(StarWarsContext);
  const { order } = sortColumns;

  const sortByColumn = (column) => {
    const planets = (filters[0].name || filters[1]) ? filteredData : data;
    setFilteredData(planets.sort((a, b) => a[column] - b[column]
      || a[column].toString().localeCompare(b[column].toString())));
    if (order === 'ASC') {
      return filteredData;
    }
    return filteredData.reverse();
  };

  return (
    <button
      type="button"
      className="sort-button"
      onClick={() => {
        setSortColumns(
          { column: currentColumn, order: order === 'ASC' ? 'DESC' : 'ASC' },
        );
        sortByColumn(currentColumn);
      }}
    >
      ⇵
    </button>
  );
};

SortButton.propTypes = {
  currentColumn: PropTypes.string.isRequired,
};

export default SortButton;
