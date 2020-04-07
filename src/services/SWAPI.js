const PLANETS_API = 'https://cors-anywhere.herokuapp.com/swapi.co/api';

const getPlanets = () => (
  fetch(`${PLANETS_API}/planets`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getPlanets;
