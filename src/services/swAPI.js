const API = 'https://cors-anywhere.herokuapp.com/https://swapi-trybe.herokuapp.com/api';

const callFetchPlanets = () => (
  fetch(`${API}/planets`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))));

export default callFetchPlanets;
