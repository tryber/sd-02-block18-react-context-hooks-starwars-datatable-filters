import React from 'react';

const typeDropdown = [
  'rotation_period',
  'orbital_period',
  'diameter',
  'surface_water',
  'population',
];

const sizeSwitchDropdown = (filterPlanets, column, comparison, value) => {
  switch (comparison) {
    case '':
      return filterPlanets;
    case 'Maior que':
      return filterPlanets
        .filter((planet) => Number(planet[column]) > Number(value));
    case 'Menor que':
      return filterPlanets
        .filter((planet) => Number(planet[column]) < Number(value));
    case 'Igual a':
      return filterPlanets
        .filter((planet) => Number(planet[column]) === Number(value));
    default:
      return null;
  }
};

const Provider = ({ children }) => {};

export default Provider;
