
const filterPlanetByName = (data, { filters }) => {
  const { name } = filters[0];
  return name
    ? data.filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase())) : data;
};

const filterPlanetByColumn = (planetsByName, { filters }) => {
  filters.splice(0, 2);
  if (!filters.length) return planetsByName;
  filters.forEach(({ numericValues: { column, comparison, valueComparison } }) => {
    switch (comparison) {
      case (comparison === 'Maior que'): {
        return planetsByName.filter((p) => (parseFloat(p[column]) > parseFloat(valueComparison)));
      }
      case (comparison === 'Menor que'): {
        return planetsByName.filter((p) => (parseFloat(p[column]) < parseFloat(valueComparison)));
      }
      case (comparison === 'ou Igual a'): {
        return planetsByName.filter((p) => (parseFloat(p[column]) === parseFloat(valueComparison)));
      }
      default:
        return planetsByName;
    }
  });
  return planetsByName;
};

const filterFunction = (data, filters) => {
  const planetsByName = filterPlanetByName(data, filters);
  const filteredPlanets = filterPlanetByColumn(planetsByName, filters);
  return filteredPlanets;
};

export default filterFunction;
