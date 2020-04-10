import planets from './mockPlanets';

export const getPlanetsByNameSearch = (word) => {
  const p = planets.filter((planet) => planet.name.toLowerCase().includes(word.toLowerCase()));
  const notP = planets.filter((planet) => !planet.name.toLowerCase().includes(word.toLowerCase()));
  return [p, notP];
};

export const getPlanetsByOneFilterLesser = (planetsParam, column, value) => {
  const plan = planetsParam.filter((p) => (parseFloat(p[column]) < parseFloat(value)));
  const notPlan = planetsParam.filter((p) => ((parseFloat(p[column]) >= parseFloat(value))));
  return [plan, notPlan];
};

export const getPlanetsByVariousFiltersBigger = (plan, column, value) => {
  const returnFilteredPlanets = plan.filter((p) => (parseFloat(p[column]) > parseFloat(value)));
  return returnFilteredPlanets;
};

export const getPlanetsByVariousFiltersEqual = (plan, column, value) => {
  const returnFilteredPlanets = plan.filter((p) => (parseFloat(p[column]) === parseFloat(value)));
  return returnFilteredPlanets;
};
