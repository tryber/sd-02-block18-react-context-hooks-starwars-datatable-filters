import React, { Component, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { acertaTexto } from './Table';
import { Context } from '../context/Provider';
// import changeSorting from '../actions/changeSorting';

function SortingSelection() {
  const { changeSorting } = useContext(Context);

  function renderColumnsSelect() {
    // const { handleChange } = this.props;
    const columns = ['name', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

    return (
      <select name="column" onChange={changeSorting} defaultValue="">
        <option value="" disabled>Select column</option>
        {columns.map((column) => (
          <option key={column} value={column}>{acertaTexto(column)}</option>
        ))}
      </select>
    );
  }

  function renderOrderSelect() {
    // const { handleChange } = this.props;
    return (
      <select name="order" onChange={changeSorting} defaultValue="ASC">
        <option value="ASC">asc. order</option>
        <option value="DESC">desc. order</option>
      </select>
    );
  }

  return (
    <div className="sorting">
      {renderColumnsSelect()}
      {renderOrderSelect()}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  // handleChange: (event) => {
  //   dispatch(changeSorting(event));
  // },
});

SortingSelection.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SortingSelection);
