import React, { useState, useContext, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import SearchBar from './SearchBar';
import Selectors from './Selectors';
import './Table.css';
import fetchPlanets from '../services/fetchPlanets';
import SortButton from './SortButton';

function renderTableHead(planets) {
  return (
    <thead>
      <tr>
        {Object.keys(planets[0] || []).map((key) => (
          key === 'residents'
            ? false
            : (
              <th key={key} className="table-head-cell">
                {key.replace(/_/, ' ').toUpperCase()}
                <SortButton currentColumn={key} />
              </th>
            )
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
              : <td key={value} data-testid="planets-infos">{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

const Table = () => {
  const { filteredData, filters, data, setData } = useContext(StarWarsContext);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const planets = (filters[0].name || filters[1]) ? filteredData : data;

  useEffect(() => {
    if (!data.length) {
      fetchPlanets()
        .then(({ results }) => {
          setIsFetching(false);
          setData(results.sort((a, b) => (a.name > b.name ? 1 : -1)));
        })
        .catch(() => {
          setIsFetching(false);
          setData('API fora do ar');
        });
    }
  }, [data.length, setData]);

  if (isFetching) return <div className="spinner" data-testid="loading" />;
  if (data === 'API fora do ar') return <div style={{ color: 'white' }}>{data}</div>;
  return (
    <section>
      <section><SearchBar /></section>
      <section><Selectors /></section>
      <table>
        {renderTableHead(data)}
        {renderTableBody(planets)}
      </table>
    </section>
  );
};

export default Table;
