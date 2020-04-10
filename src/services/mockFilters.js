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
  return plan.filter((p) => (parseFloat(p[column]) > parseFloat(value)));
};

export const getPlanetsByVariousFiltersEqual = (plan, column, value) => {
  return plan.filter((p) => (parseFloat(p[column]) === parseFloat(value)));
};
