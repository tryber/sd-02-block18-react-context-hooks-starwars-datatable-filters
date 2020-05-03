import React, { useState, useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { getPlanets } from '../actions/getPlanets';
import { StarWarsContext } from '../context/StarWarsContext';
import SearchBar from './SearchBar';
import Selectors from './Selectors';
import './Table.css';
import fetchPlanets from '../services/fetchPlanets';

function renderTableHead(planets) {
  return (
    <thead>
      <tr>
        {Object.keys(planets[0] || []).map((key) => (
          key === 'residents'
            ? false
            : <th key={key}>{key.replace(/_/, ' ').toUpperCase()}</th>
        ))}
      </tr>
    </thead>
  );
}

function renderTableBody(planets) {
  return (
    <tbody>
      {planets.map((planet) => (
        <tr key={planet.name}>
          {Object.entries(planet).map(([key, value]) => (
            key === 'residents'
              ? false
              : <td key={value}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

const Table = () => {
  const { filteredData, state, data, setData } = useContext(StarWarsContext);
  const { filters } = state;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!data.length) {
      setIsFetching(true);
      fetchPlanets()
        .then(
          ({ results }) => {
            setIsFetching(false);
            setData(results);
          },
          (error) => {
            setIsFetching(false);
            setData(error);
          },
        );
    }
  }, [data.length, setData]);

  // const { data, isFetching, filteredData, filters } = this.props;
  if (isFetching) return <div className="spinner" />;
  return (
    <section>
      <section>
        <SearchBar />
      </section>
      <section>
        <Selectors />
      </section>
      <table>
        {renderTableHead(data)}
        {filters[0].name || filters[1]
          ? renderTableBody(filteredData)
          : renderTableBody(data)}
      </table>
    </section>
  );
};

// Table.propTypes = {
//   data: PropTypes.instanceOf(Array).isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   fetchPlanets: PropTypes.func.isRequired,
//   filteredData: PropTypes.instanceOf(Array),
//   filters: PropTypes.instanceOf(Array).isRequired,
// };

// Table.defaultProps = {
//   filteredData: [],
// };

// const mapStateToProps = (
//   { planetsData: { data, isFetching }, planetsFilters: { filteredData, filters } },
// ) => ({ data, isFetching, filteredData, filters });

// const mapDispatchToProps = (dispatch) => ({
//   fetchPlanets: () => dispatch(getPlanets()),
// });

export default Table;
