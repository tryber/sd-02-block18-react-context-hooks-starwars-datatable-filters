const SWAPI = 'https://swapi-trybe.herokuapp.com/api/planets';

const fetchPlanets = () => (
  fetch(SWAPI).then((response) => response.json()).then((results) => results)
);

export default fetchPlanets;
