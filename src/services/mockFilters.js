import planets from './mockPlanets';

export const getPlanetsByNameSearch = (word) => {
  const p = planets.filter((planet) => planet.name.toLowerCase().includes(word.toLowerCase()));
  return p;
};

export const getPlanetsByOneFilterLesser = (word, column, value) => {
  if (!word) {
    const planet = planets.filter((p) => (parseFloat(p[column]) < parseFloat(value)));
    return planet;
  }
  return getPlanetsByNameSearch(word).filter((p) => (parseFloat(p[column]) < parseFloat(value)));
};

export const getPlanetsByVariousFiltersBigger = (plan, column, value) => {
  const returnFilteredPlanets = plan.filter((p) => (parseFloat(p[column]) > parseFloat(value)));
  return returnFilteredPlanets;
};

export const getPlanetsByVariousFiltersEqual = (plan, column, value) => {
  const returnFilteredPlanets = plan.filter((p) => (parseFloat(p[column]) === parseFloat(value)));
  return returnFilteredPlanets;
};
