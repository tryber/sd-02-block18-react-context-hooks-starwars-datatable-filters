import React, { useContext } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';
import NameFilter from './NameFilter';
import NumericFilters from './NumericFilters';
import usePlanetsFiltering from '../hooks/usePlanetsFiltering';
import '../style/Table.css';
import useSWAPI from '../services/useSWAPI';

const TableHeaders = () => (
  <tr>
    <th>Name</th>
    <th>Rotation period</th>
    <th>Orbital period</th>
    <th>Diamater</th>
    <th>Climate</th>
    <th>Gravity</th>
    <th>Terrain</th>
    <th>Surface Water</th>
    <th>Population</th>
    <th>Films</th>
    <th>Created</th>
    <th>Edited</th>
    <th>URL</th>
  </tr>
);

const PlanetRows = () => {
  const filteredPlanets = usePlanetsFiltering();
  return (
    filteredPlanets.map(({
      name, rotation_period: rotationPeriod, orbital_period: orbitalPeriod, diameter,
      climate, gravity, terrain, surface_water: surfaceWater, population, films, created,
      edited, url,
    }) => (
      <tr data-testid="table-row" key={name}>
        <td>{name}</td>
        <td className="rotation-period">{rotationPeriod}</td>
        <td className="orbital-period">{orbitalPeriod}</td>
        <td className="diameter">{diameter}</td>
        <td>{climate}</td>
        <td>{gravity}</td>
        <td>{terrain}</td>
        <td className="surface-water">{surfaceWater}</td>
        <td className="population">{population}</td>
        <td className="films">{films}</td>
        <td>{created}</td>
        <td>{edited}</td>
        <td>{url}</td>
      </tr>
    ))
  );
};

export default function Table() {
  useSWAPI();
  const { loading: [isLoading] } = useContext(PlanetsDBContext);
  return (
    <div>
      <h1>StarWars Datatable with Filters</h1>
      <div>
        <NameFilter />
      </div>
      <div>
        <NumericFilters />
      </div>
      {isLoading ? <span>Loading...</span>
        : (
          <div data-testid="table-container" className="table-container">
            <table className="table">
              <thead>
                <TableHeaders />
              </thead>
              <tbody>
                <PlanetRows />
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}
