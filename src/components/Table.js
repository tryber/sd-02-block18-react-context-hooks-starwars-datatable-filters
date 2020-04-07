import React, { /* Component, */useEffect, useContext } from 'react';
/* import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlanets } from '../actions'; */
import { StarWarsContext } from '../context/StarWarsContext';
import callFetchPlanets from '../services/swAPI';
import './Table.css';

const Table = () => {
  /* componentDidMount() {
    const { callFetchPlanets } = this.props;
    callFetchPlanets();
  } */

  const {
    isFetching, data, tableData, error,
    changeFetch, requestPlanetsSuccess, requestPlanetsFailure,
  } = useContext(StarWarsContext);

  useEffect(() => {
    changeFetch(true);
    callFetchPlanets()
      .then(
        (dataJson) => requestPlanetsSuccess(dataJson),
        (errorJson) => requestPlanetsFailure(errorJson.message),
      );
  }, []);

  const tableHead = () => (
    <thead>
      <tr>
        {
          Object.keys(data[0] || []).map((header) => ((header !== 'residents')
            ? (
              <th className="tableHeader" key={header}>
                {header.substring(0, 1).toUpperCase()
                  .concat(header.substring(1)).replace('_', ' ')}
              </th>
            )
            : null))
        }
      </tr>
    </thead>
  );

  if (isFetching) return <div><h1 className="title">Loading...</h1></div>;
  return (
    <div>
      <h1 className="title">StarWars Datatable with Filters</h1>
      {error
        ? (
          <p className="error">
            {error}
            . Do you have an active Internet Connection?
          </p>
        )
        : (
          <table className="containerTable">
            {tableHead()}
            {tableData()}
          </table>
        )}
    </div>
  );
};

/* const mapStateToProps = ({
  reducerPlanets: { data, filteredData, isFetching },
  allFilters: { filters },
  allFilters: { filters: [{ name }] },
}) => ({
  data, filteredData, isFetching, filters, name,
}); */

/* const mapDispatchToProps = (dispatch) => ({
  callFetchPlanets: () => dispatch(fetchPlanets()),
}); */

/* Table.propTypes = {
  callFetchPlanets: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array),
  filters: PropTypes.instanceOf(Array).isRequired,
};

Table.defaultProps = {
  data: [],
  filteredData: [],
}; */

export default Table;
