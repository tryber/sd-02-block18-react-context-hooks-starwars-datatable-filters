import React, { useContext, useEffect, useState } from 'react';
import { PlanetsDBContext } from '../context/PlanetsDBContext';
import NameFilter from './NameFilter';
import NumericFilters from './NumericFilters';
import SortButton from './SortButton';
import usePlanetsFiltering from '../hooks/usePlanetsFiltering';
import '../style/Table.css';
import useSWAPI from '../services/useSWAPI';

const TableHeaders = () => (
  <tr>
    <th><SortButton columnName="name">Name</SortButton></th>
    <th><SortButton columnName="rotation_period">Rotation period</SortButton></th>
    <th><SortButton columnName="orbital_period">Orbital period</SortButton></th>
    <th><SortButton columnName="diameter">Diamater</SortButton></th>
    <th><SortButton columnName="climate">Climate</SortButton></th>
    <th><SortButton columnName="gravity">Gravity</SortButton></th>
    <th><SortButton columnName="terrain">Terrain</SortButton></th>
    <th><SortButton columnName="surface_water">Surface Water</SortButton></th>
    <th><SortButton columnName="population">Population</SortButton></th>
    <th><SortButton columnName="films">Films</SortButton></th>
    <th><SortButton columnName="created">Created</SortButton></th>
    <th><SortButton columnName="edited">Edited</SortButton></th>
    <th><SortButton columnName="url">URL</SortButton></th>
  </tr>
);

const planetRows = (planetsData) => {
  return (
    planetsData !== undefined ? planetsData.map(({
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
    )) : null
  );
};

export default function Table() {
  const { loading: [isLoading], data: [planetsData] } = useContext(PlanetsDBContext);

  useSWAPI();

  return (
    <div>
      <h1>StarWars Datatable with Filters</h1>
      <div>
        <NameFilter />
      </div>
      <div>
        <NumericFilters />
      </div>
      {isLoading && <span>Loading...</span> }
      <div data-testid="table-container" className="table-container">
        <table className="table">
          <thead>
            <TableHeaders />
          </thead>
          <tbody>
            {planetRows(usePlanetsFiltering())}
          </tbody>
        </table>
      </div>
    </div>
  );
}
