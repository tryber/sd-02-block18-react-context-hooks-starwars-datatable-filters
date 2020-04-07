import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableContent from './tableContent';

function Table() {
  const { fetchPlanets, data, isLoading } = useContext(StarWarsContext);

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && <TableContent data={data} />}
    </div>
  );
}

export default Table;
