const PLANET_API = 'https://swapi.co/api/planets';

const getPlanets = () => (
  fetch(PLANET_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getPlanets;
