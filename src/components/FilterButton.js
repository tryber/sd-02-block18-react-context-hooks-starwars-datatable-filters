import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StarWarsContext } from '../context/StarWarsContext';

const FilterButton = ({ filterCallback }) => {
  const {
    data, filters, filteredData, numericFilter, setNumericFilter,
  } = useContext(StarWarsContext);
  const { column, comparison, value } = numericFilter;
  return (
    <input
      type="reset"
      value="Filtrar"
      onClick={() => {
        filterCallback(
          filters[0].name, data, column, comparison, value, filters, filteredData,
        );
        setNumericFilter({ column: '', comparison: '', value: '' });
      }}
      disabled={!(column && comparison && value)}
    />
  );
};

FilterButton.propTypes = {
  filterCallback: PropTypes.func.isRequired,
};

export default FilterButton;
