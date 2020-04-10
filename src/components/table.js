import React, { useContext, useEffect } from 'react';
import ReactLoading from 'react-loading';
import StarWarsContext from '../context/StarWarsContext';
import TableContent from './tableContent';
import '../styles/table.css';

function Table() {
  const {
    fetchPlanets, data, isLoading,
  } = useContext(StarWarsContext);

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <div className="table-container">
      {isLoading && <div data-testid="loading" className="loading-container"><ReactLoading type="spin" color="yellow" height={150} /></div>}
      {!isLoading && <TableContent data={data} />}
    </div>
  );
}

export default Table;
