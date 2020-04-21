
const filterPlanetByName = (data, filters) => {
  const { name } = filters[0];
  return name
    ? data.filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase())) : data;
};

const filterPlanetByColumn = (planetsByName, filters) => {
  const cpFilters = [...filters];
  cpFilters.splice(0, 1);
  if (!cpFilters.length) return planetsByName;
  let planets = planetsByName;
  cpFilters.forEach(({ numericValues: { column, comparison, value } }) => {
    if (column !== 'coluna' && comparison === 'Maior que' && value >= 0) {
      planets = planets.filter((pla) => (parseFloat(pla[column]) > parseFloat(value)));
    } else if (column !== 'coluna' && comparison === 'Menor que' && value >= 0) {
      planets = planets.filter((pla) => (parseFloat(pla[column]) < parseFloat(value)));
    } else if (column !== 'coluna' && comparison === 'ou Igual a' && value >= 0) {
      planets = planets.filter((pla) => (parseFloat(pla[column]) === parseFloat(value)));
    }
  });
  return planets;
};

const filterFunction = (data, filters) => {
  const planetsByName = filterPlanetByName(data, filters);
  const filteredPlanets = filterPlanetByColumn(planetsByName, filters);
  return filteredPlanets;
};

export default filterFunction;
