export const SW_BASE_API = 'https://cors-anywhere.herokuapp.com/https://swapi-trybe.herokuapp.com/api';

const getCurrentSwPlanets = () => (
  fetch(`${SW_BASE_API}/planets`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrentSwPlanets;
