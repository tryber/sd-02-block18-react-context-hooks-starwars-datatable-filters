import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import './Table.css';

const Table = () => {
  const { isFetching, error, tableHead, tableData } = useContext(StarWarsContext);

  if (isFetching) return <div><h1 className="title">Loading...</h1></div>;
  return (
    <div>
      <h1 className="title">StarWars Datatable with Filters</h1>
      {error
        ? (
          <p className="error">
            {error}
            . Do you have an active Internet Connection?
          </p>
        )
        : (
          <table className="containerTable">
            {tableHead()}
            {tableData()}
          </table>
        )}
    </div>
  );
};

export default Table;
