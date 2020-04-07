import React, { useContext } from 'react';
import './SavedFilters.css';
import { StarWarsContext } from '../context/StarWarsContext';

const SavedFilters = () => {
  const { filters, filterButton } = useContext(StarWarsContext);
  const onlyNumeric = filters.slice(1);

  return (
    <div className="flexy-saved-filters">
      {onlyNumeric.map((filter) => {
        const { column, comparison, value } = filter.numericValues;
        return (
          <div className="saved-filters-container" key={column}>
            <p className="saved-filters-title">
              {column.substring(0, 1).toUpperCase()
                .concat(column.substring(1)).replace('_', ' ')}
            </p>
            <p className="saved-filters-text">{comparison}</p>
            <p className="saved-filters-text">{value}</p>
            {filterButton(column)}
          </div>
        );
      })}
    </div>
  );
};

/* 
const mapStateToProps = ({
  allFilters: {
    filters,
    columnsSelect,
  },
}) => ({
  filters,
  columnsSelect,
});

const mapDispatchToProps = (dispatch) => ({
  passingRemoveFilter: (column) => dispatch(removeFilter(column)),
});

SavedFilters.propTypes = {
  passingRemoveFilter: PropTypes.func.isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
}; */

export default SavedFilters;
