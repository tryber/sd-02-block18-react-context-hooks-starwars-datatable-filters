import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsProvider';
import SearchBar from './SearchBar';

function renderTableHead(planets) {
  return (
    <thead>
      <tr>
        {Object.keys(planets[0]).map((key) => (
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
  const { isFetching, planets, filteredPlanets } = useContext(PlanetsContext);

  return (
    <div>
      <SearchBar />
      {isFetching
        ? 'loading...'
        : (
          <table>
            {renderTableHead(planets)}
            {
              filteredPlanets.length
                ? renderTableBody(filteredPlanets)
                : renderTableBody(planets)
            }
          </table>
        )}
    </div>
  );
};

export default Table;
