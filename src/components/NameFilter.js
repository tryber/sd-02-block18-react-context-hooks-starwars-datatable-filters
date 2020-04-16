import React, { Component, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import changeNameFilter from '../actions/changeNameFilter';
import { Context } from '../context/Provider';

function NameFilter() {
  // const { valueInput, handleChange } = this.props;
  const { filters: [{ name: valueInput }], changeNameFilter } = useContext(Context);

  return (
    <div className="filter">
      <input
        placeholder="Search by name"
        value={valueInput}
        onChange={changeNameFilter}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  valueInput: state.filters[0].name,
});

const mapDispatchToProps = (dispatch) => ({
  // handleChange: (event) => {
  //   dispatch(changeNameFilter(event));
  // },
});

NameFilter.propTypes = {
  valueInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NameFilter);
