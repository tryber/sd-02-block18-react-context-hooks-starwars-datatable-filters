import React, { useContext } from 'react';

import FilterContext from '../contexts/FilterContext';

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
  const { filterPlanets } = useContext(FilterContext);

  return (
    <table className="darkTable">
      {TableTHead(filterPlanets)}
      {TableTBody(filterPlanets)}
    </table>
  );
};

export default PlanetsList;
