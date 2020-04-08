import React, { useContext } from 'react';

import ApiContext from '../contexts/ApiContext';
import useFilter from '../customHooks/useFilter';

import './PlanetsList.css';

const TableTHead = (planets) => (
  <thead>
    <tr>
      {Object.keys(planets[0] || []).map((tHead) => <th key={tHead}>{tHead}</th>)}
    </tr>
  </thead>
);

const TableTBody = (planets) => (
  <tbody>
    {planets.map((planet) => (
      <tr key={planet.name}>
        {Object.values(planet).map((value) => (
          <td key={value}>{value}</td>
        ))}
      </tr>
    ))}
  </tbody>
);

const PlanetsList = () => {
  const { planets } = useContext(ApiContext);
  const { filterPlanets } = useFilter(planets);
  return (
    <table className="darkTable">
      {TableTHead(filterPlanets)}
      {TableTBody(filterPlanets)}
    </table>
  );
};

export default PlanetsList;
