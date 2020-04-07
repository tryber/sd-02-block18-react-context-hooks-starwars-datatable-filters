import React, { /* Component, */ useContext } from 'react';
/* import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  nameFilter,
  numberFilter,
} from '../actions'; */
import './Filters.css';
import { StarWarsContext } from '../context/StarWarsContext';

const Filters = () => {
  /* constructor(props) {
    super(props); */
  /* this.state = {
    column: '',
    comparison: '',
    value: '',
  }; */

  /*   this.handleChange = this.handleChange.bind(this);
    this.createFilter = this.createFilter.bind(this);
  } */

/*   const handleChange = (e) => {
    // const { name, value } = e.target;
    // this.setState({
    //   [name]: value,
    // });
  }; */

  const { name, renderNumValues, nameFilter } = useContext(StarWarsContext);
  return (
    <div className="number-filters">
      {renderNumValues()}
      <span>Digite o nome do planeta: </span>
      <input
        type="text"
        placeholder="Digite aqui"
        onChange={(e) => nameFilter(e.target.value)}
        value={name}
      />
    </div>
  );
};

/*
const mapStateToProps = ({
  allFilters: {
    filters: [
      {
        name,
      },
    ],
    columnsSelect,
  },
}) => ({
  name, columnsSelect,
}); */
/*
const mapDispatchToProps = (dispatch) => ({
  passingName: (param) => dispatch(nameFilter(param)),
  dispatchFilter: (column, comparison, value) => dispatch(numberFilter(column, comparison, value)),
}); */
/*
Filters.propTypes = {
  passingName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dispatchFilter: PropTypes.func.isRequired,
  columnsSelect: PropTypes.instanceOf(Array).isRequired,
}; */

export default Filters;
