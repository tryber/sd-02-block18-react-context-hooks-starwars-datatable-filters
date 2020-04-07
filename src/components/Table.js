import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import './Table.css';

const Table = () => {
  const { isFetching, data, tableData } = useContext(StarWarsContext);

  const tableHead = () => {
    const teste = Object.keys(data[0] || []).filter((header) => ((header !== 'residents')));
    return (
      <thead>
        <tr>
          {teste.map((header) => (
            <th className="tableHeader" key={header}>
              {header.substring(0, 1).toUpperCase()
                .concat(header.substring(1)).replace('_', ' ')}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  if (isFetching) return <div><h1 className="title">Loading...</h1></div>;
  return (
    <div>
      <h1 className="title">StarWars Datatable with Filters</h1>
      <table className="containerTable">
        {tableHead()}
        {tableData()}
      </table>
    </div>
  );
};

export default Table;
