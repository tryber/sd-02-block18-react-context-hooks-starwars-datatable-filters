const API = 'https://cors-anywhere.herokuapp.com/https://swapi-trybe.herokuapp.com/api/planets';

const fetchApi = () => (
  fetch(API)
    .then((response) => (
      response
        .json()
        .then((json) => ((response.ok)
          ? Promise.resolve(json.results)
          : Promise.reject(json)))
    ))
);

export default fetchApi;
