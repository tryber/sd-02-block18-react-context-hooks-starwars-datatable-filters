import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StarWarsContext } from '../context/StarWarsContext';

const SortButton = ({ currentColumn }) => {
  const { sortColumns, setSortColumns } = useContext(StarWarsContext);
  const { order } = sortColumns;
  return (
    <button
      type="button"
      className="sort-button"
      onClick={() => {
        setSortColumns(
          { column: currentColumn, order: order === 'DESC' ? 'ASC' : 'DESC' },
        );
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
