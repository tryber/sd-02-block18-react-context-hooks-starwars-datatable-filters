import React, { useState, useContext, useEffect } from 'react';
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
  const { filteredData, filters, data, setData } = useContext(StarWarsContext);
  // const { filters: allFilters } = filters;
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

export default Table;
