import React, { useContext, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import TableHeader from './TableHeader';

function sortAscending(planetData, isNumeric, column) {
  if (!isNumeric) {
    return planetData.sort((a, b) => {
      if (a[column] > b[column]) return 1;
      return -1;
    });
  }
  return planetData.sort((a, b) => {
    if (a[column] === 'unknown') return 1;
    if (b[column] === 'unknown') return -1;
    return Number(a[column]) - Number(b[column]);
  });
}

function sortDescending(planetData, isNumeric, column) {
  if (!isNumeric) {
    return planetData.sort((a, b) => {
      if (b[column] > a[column]) return 1;
      return -1;
    });
  }
  return planetData.sort((a, b) => {
    if (a[column] === 'unknown') return -1;
    if (b[column] === 'unknown') return 1;
    return Number(b[column]) - Number(a[column]);
  });
}

function changeColumnOrder(planetData, sortColumn) {
  const { column, order } = sortColumn;
  const numericColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const isNumeric = numericColumns.includes(column);

  if (order === 'ASC') return sortAscending(planetData, isNumeric, column);
  return sortDescending(planetData, isNumeric, column);
}

function comparisonCase(filters, data) {
  return filters.reduce((previousList, filter, index) => {
    const planetList = (index === 0) ? data : previousList;
    const obj = {
      bigger: planetList.filter((planet) => Number(planet[filter.column]) > filter.value),
      less: planetList.filter((planet) => Number(planet[filter.column]) < filter.value),
      equal: planetList.filter((planet) => planet[filter.column] === filter.value),
    };
    return obj[filter.comparison];
  }, []);
}

function filterNumericNumber(planetData, numericFilters) {
  if (numericFilters.length !== 0) {
    return comparisonCase(numericFilters, planetData);
  }
  return planetData;
}

function filterPlanetsName(data, name) {
  if (name) {
    return data.filter((planet) => planet.name.toUpperCase().includes(name.toUpperCase()));
  }
  return data;
}

function createRows(planet) {
  return (
    <tr key={planet.name}>
      <td>{planet.name}</td>
      <td>{planet.population}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.films.map((film) => <div key={film}>{film}</div>)}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  );
}

function Table() {
  const {
    planetData: { data, isFetching },
    numericFilters,
    nameFilter,
    fetchPlanets,
    sortColumn,
  } = useContext(StarWarsContext);
  const filteredPlanets = filterNumericNumber(filterPlanetsName(data, nameFilter), numericFilters);
  const sortedPlanets = changeColumnOrder(filteredPlanets, sortColumn);

  useEffect(() => {
    fetchPlanets();
  });

  return (
    <div className="table">
      {isFetching && <p>Loading...</p>}
      <p>Para ordenar basta clicar em cima do titulo da coluna desejada.</p>
      <table>
        <tbody>
          <TableHeader />
          {sortedPlanets && sortedPlanets.map((planet) => createRows(planet))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
