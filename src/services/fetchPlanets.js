const fetchPlanets = () => (
  fetch('https://swapi.co/api/planets')
    .then((response) => response.json().then(({ results }) => results))
);

export default fetchPlanets;
