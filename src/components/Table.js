import React, { useState, useEffect } from 'react';
import fetchPlanets from '../services/fetchPlanets';

// function useFetchPlanets() {
//   const [state, setState] = useState(true);

//   useEffect(() => {
//     setState(fetchPlanets().then(() => setIsFetching(false)));
//   }, []);

//   return [state, setState];
// }

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
  const [isFetching, setIsFetching] = useState(true);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets().then((results) => {
      setPlanets(results);
      setIsFetching(false);
    });
  }, []);

  return (
    <div>
      {isFetching
        ? 'loading...'
        : (
          <table>
            {renderTableHead(planets)}
            {renderTableBody(planets)}
          </table>
        )}
    </div>
  );
};

export default Table;
