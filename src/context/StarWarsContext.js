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
      (data) => setData(data.results),
      (error) => setError(error.message),
    );
    setOnLoad(true);
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
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  )
}

export { StarWarsContext, StarWarsProvider };

StarWarsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
