import React, { useContext, useEffect } from 'react';
import starWarsContext from '../context/StarWarsContext';
import Thead from './Thead';
import Tbody from './Tbody';
import NumericFilter from './NumericFilter';

const Table = () => {
  const {
    fetchPlanets, error, isFetching, filterName,
  } = useContext(starWarsContext);
  useEffect(fetchPlanets, []);
  if (!isFetching) return <h1>Loading</h1>;
  return (error
    || (
      <div>
        <h1>Starwars Planets</h1>
        <input type="text" onChange={({ target: { value } }) => filterName(value)} />
        <NumericFilter />
        <table border="1px">
          <Thead />
          <Tbody />
        </table>
      </div>
    )
  );
};

export default Table;
