import React, { createContext, useState } from 'react';

const Context = createContext();

const Provider = ({ children }) => {
  const [data, setData] = useState([{ name: '' }]);
  const [filters, setFilters] = useState([
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '>',
        value: '',
      },
    },
  ]);
  const [sorting, setSorting] = useState({ column: 'name', order: 'ASC' });
  const updateData = () => (
    fetch('https://swapi-trybe.herokuapp.com/api/planets')
      .then((response) => response.json())
      .then(({ results }) => setData(results))
  );
  const isLoading = (data.length <= 1);
  const changeNameFilter = ({ target: { value } }) => (
    setFilters([
      { name: value },
      ...filters.slice(1),
    ])
  );

  const context = { data, filters, sorting, updateData, isLoading, changeNameFilter };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider as ProviderContext };
