
const filterPlanetByName = (data, { filters }) => {
  const { name } = filters[0];
  return name
    ? data.filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase())) : data;
};

const filterPlanetByColumn = (planetsByName, { filters }) => {
  const cpFilters = [...filters];
  cpFilters.splice(0, 2);
  if (!cpFilters.length) return planetsByName;
  let planet = planetsByName;
  cpFilters.forEach(({ numericValues: { column, comparison, valueComparison } }) => {
    if (column !== 'coluna' && comparison === 'Maior que' && valueComparison >= 0) {
      planet = planet.filter((pla) => (parseFloat(pla[column]) > parseFloat(valueComparison)));
    } else if (column !== 'coluna' && comparison === 'Menor que' && valueComparison >= 0) {
      planet = planet.filter((pla) => (parseFloat(pla[column]) < parseFloat(valueComparison)));
    } else if (column !== 'coluna' && comparison === 'ou Igual a' && valueComparison >= 0) {
      planet = planet.filter((pla) => (parseFloat(pla[column]) === parseFloat(valueComparison)));
    }
  });
  return planet;
};

const filterFunction = (data, filters) => {
  const planetsByName = filterPlanetByName(data, filters);
  const filteredPlanets = filterPlanetByColumn(planetsByName, filters);
  return filteredPlanets;
};

export default filterFunction;
