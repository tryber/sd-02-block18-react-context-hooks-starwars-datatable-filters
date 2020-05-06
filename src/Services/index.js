const SWAPI = 'https://swapi-trybe.herokuapp.com/api/planets';

const SwPlanetsRequest = () => (
  fetch(SWAPI)
    .then((answer) => answer.json()
      .then((data) => (answer.ok ? Promise.resolve(data) : Promise.reject(data))))
);

export default SwPlanetsRequest;
