import React, { Component, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import changeNumericValuesFilters from '../actions/changeNumericValuesFilters';
// import deleteNumericValuesFilters from '../actions/deleteNumericValuesFilters';
import { acertaTexto } from './Table';
import { Context } from '../context/Provider';

function verificaEntradasVazias(array) {
  return array.every((item, index) => (
    item !== '' || index === array.length - 1
  ));
}

function addFilter(i, filters, changeNumericValuesFilters, deleteNumericValuesFilters) {
  // const { arrayColumns, handleChange, handleClick } = this.props;
  const arrayColumns = filters.slice(1).map((item) => item.numericValues.column);

  const newArrayColumns = arrayColumns.slice(0, i - 1);
  const allColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const columnsRestantes = allColumns.filter((item) => !newArrayColumns.includes(item));

  const objectStates = filters.slice(1).reduce((acc, current, index) => ({
    ...acc,
    [`valueSelectedColumn${index + 1}`]: current.numericValues.column,
    [`valueSelectedComparison${index + 1}`]: current.numericValues.comparison,
    [`valueNumber${index + 1}`]: current.numericValues.value,
  }), {});

  return (
    <div id={i} className="filter" key={i}>
      <select name="column" onChange={changeNumericValuesFilters} value={objectStates[`valueSelectedColumn${i}`]}>
        <option value="" disabled>Select column</option>
        {columnsRestantes.map((item) => (
          <option key={item} value={item}>{acertaTexto(item)}</option>
        ))}
      </select>
      <select name="comparison" onChange={changeNumericValuesFilters} value={objectStates[`valueSelectedComparison${i}`]}>
        <option value=">">greater than</option>
        <option value="<">less than</option>
        <option value="===">equal to</option>
      </select>
      <input type="number" placeholder="Enter a number" name="value" onChange={changeNumericValuesFilters} value={objectStates[`valueNumber${i}`]} />
      <button type="button" onClick={deleteNumericValuesFilters}>X</button>
    </div>
  );
}

function NumericValuesFilters() {
  const { filters, changeNumericValuesFilters, deleteNumericValuesFilters } = useContext(Context);

  function addMoreAndMoreFilters() {
    // const arrayValues = this.props.arrayValues;
    // const arrayColumns = this.props.arrayColumns;
    const arrayValues = filters.slice(1).map((item) => item.numericValues.value);
    const arrayColumns = filters.slice(1).map((item) => item.numericValues.column);

    let numericFilters;

    if (verificaEntradasVazias(arrayValues) && verificaEntradasVazias(arrayColumns)) {
      numericFilters = (
        <div>
          {arrayValues.map((item, i) => (
            addFilter(i + 1, filters, changeNumericValuesFilters, deleteNumericValuesFilters)
          ))}
        </div>
      );
    } else {
      const newArrayValues = arrayValues.slice(0, arrayValues.length - 1);

      numericFilters = (
        <div>
          {newArrayValues.map((item, i) => (
            addFilter(i + 1, filters, changeNumericValuesFilters, deleteNumericValuesFilters)
          ))}
        </div>
      );
    }

    return numericFilters;
  }

  return (
    <div>
      {addMoreAndMoreFilters()}
    </div>
  );
}

const mapStateToProps = (state) => {
  // const objectStates = state.filters.slice(1).reduce((acc, current, i) => ({
  //   ...acc,
  //   [`valueSelectedColumn${i + 1}`]: current.numericValues.column,
  //   [`valueSelectedComparison${i + 1}`]: current.numericValues.comparison,
  //   [`valueNumber${i + 1}`]: current.numericValues.value,
  // }), {});
  // const arrayValues = state.filters.slice(1).map((item) => item.numericValues.value);
  // const arrayColumns = state.filters.slice(1).map((item) => item.numericValues.column);

  // return { ...objectStates, arrayValues, arrayColumns };
};

const mapDispatchToProps = (dispatch) => ({
  // handleChange: (event) => {
  //   dispatch(changeNumericValuesFilters(event));
  // },
  // handleClick: (event) => {
  //   dispatch(deleteNumericValuesFilters(event));
  // },
});

NumericValuesFilters.propTypes = {
  arrayValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  arrayColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NumericValuesFilters);
