import React, { createContext, useState } from 'react';
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
    dataMockFilter,
    dataMockOn,
    dataMockFilterOn,
    onLoad,
    filters,
    callAPI,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  )
}

export { StarWarsContext, StarWarsProvider };
