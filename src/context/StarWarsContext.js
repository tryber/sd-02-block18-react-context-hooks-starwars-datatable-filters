import React, { createContext, useState } from 'react';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {

  const [data, useData] = useState([]);
  const [dataMock, setDataMock] = useState([]);
  const [dataMockFilter, setDataMockFilter] = useState([]);
  const [dataMockOn, setDataMockOn] = useState(false);
  const [dataMockFilterOn, setDataMockFilterOn] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const [filters, setFilters] = useState([]);

  const context = {
    data,
    dataMock,
    dataMockFilter,
    dataMockOn,
    dataMockFilterOn,
    onLoad,
    filters,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  )
}

export { StarWarsContext, StarWarsProvider };
