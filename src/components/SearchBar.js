import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { filterByName } from '../actions/filterPlanets';
import './SearchBar.css';
import { StarWarsContext } from '../context/StarWarsContext';

const SearchBar = () => {
  const { input, setInput, data, state, filterByName } = useContext(StarWarsContext);
  const { filters } = state;

  useEffect(() => {
    filterByName(input, data, filters);
  }, [input]);

  // function onChangeHandler(event) {
  //   const { value } = event.target;
  //   const { filterPlanetsByName, data, filters } = this.props;

  //   filterPlanetsByName(value, data, filters);
  // }

  return (
    <div className="group search-bar">
      <input onChange={({ target: { value } }) => setInput(value)} id="search-bar" required />
      <span className="highlight" />
      <span className="bar" />
      <label htmlFor="search-bar">Search by planet name</label>
    </div>
  );
};

// SearchBar.propTypes = {
//   data: PropTypes.instanceOf(Array).isRequired,
//   filterPlanetsByName: PropTypes.func.isRequired,
//   filters: PropTypes.instanceOf(Array).isRequired,
// };

// const mapStateToProps = ({ planetsData: { data }, planetsFilters: { filteredData, filters } }) => ({
//   data,
//   filteredData,
//   filters,
// });

// const mapDispatchToProps = (dispatch) => ({
//   filterPlanetsByName: (name, data, filters) => dispatch(filterByName(name, data, filters)),
// });

export default SearchBar;
