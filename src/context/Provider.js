import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';

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
  const changeNumericValuesFilters = ({ target: { value, name, parentNode: { id } } }) => {
    const newFilters = [...filters];
    newFilters.splice(
      Number(id),
      1,
      {
        numericValues: {
          ...filters[Number(id)].numericValues,
          [name]: value,
        },
      },
    );
    setFilters(newFilters.concat(
      Number(id) === filters.length - 1 && Number(id) < 5
        ? [{ numericValues: { column: '', comparison: '>', value: '' } }]
        : [],
    ));
  };
  const deleteNumericValuesFilters = ({ target: { parentNode: { id } } }) => (
    setFilters(filters.filter((item, index) => Number(id) !== index))
  );
  const changeSorting = ({ target: { name, value } }) => (
    setSorting({
      ...sorting,
      [name]: value,
    })
  );

  const context = {
    data,
    filters,
    sorting,
    updateData,
    isLoading,
    changeNameFilter,
    changeNumericValuesFilters,
    deleteNumericValuesFilters,
    changeSorting,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export { Context, Provider as ProviderContext };
