import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';
import getEndPointSwAPI from '../service/SwAPI';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [dataMock, setDataMock] = useState([]);
  const [dataMockFilter, setDataMockFilter] = useState([]);
  const [dataMockOn, setDataMockOn] = useState(false);
  const [dataMockFilterOn, setDataMockFilterOn] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const [filters, setFilters] = useState([]);

  const callAPI = () => {
    getEndPointSwAPI()
    .then(
      (datas) => {
        setData(datas.results);
        setDataMockFilter(datas.results);
        return setDataMock(datas.results);
      },
      (errors) => setError(errors.message),
    );
    setOnLoad(true);
  };

  const filterResults = (whosFilter, planet) => {
    const filteredResult = whosFilter.map((result) => {
      const filter = (result.name.toUpperCase().includes(planet.toUpperCase()))
    ? result
    : [];
      return filter;
    });
    return filteredResult;
  }
  
  const planetAction = (planet) => {
    let whosFilter = data;
    // if (dataMockFilterOn) {
    //   whosFilter = dataMock;
    // }
    const filteredResult = filterResults(whosFilter, planet);
    const filterWithoutUndefined = filteredResult.filter((element) => element.length !== 0);
    const planetCase = planet.charAt(0).toUpperCase() + planet.substring(1);
    // if (dataMockFilterOn) {
    //   return dispatch(dataWithFilter(filterWithoutUndefined, planetCase));
    // }
    return setDataMock(filterWithoutUndefined, planetCase);
  };

  const context = {
    data,
    error,
    dataMock,
    setDataMock,
    dataMockFilter,
    setDataMockFilter,
    dataMockOn,
    setDataMockOn,
    dataMockFilterOn,
    setDataMockFilterOn,
    onLoad,
    filters,
    setFilters,
    callAPI,
    planetAction,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

export { StarWarsContext, StarWarsProvider };

StarWarsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
