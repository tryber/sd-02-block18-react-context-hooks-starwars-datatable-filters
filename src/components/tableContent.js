import React from 'react';
import '../styles/tableContent.css';

function Table({ data }) {
  const headerTable = Object.keys(data[0]);
  return (
    <table>
      <thead>
        <tr>
          {headerTable.map((header) => (
            header !== 'residents' ? <th key={header}>{header}</th> : null
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((planet) => (
          <tr>
            {Object.keys(planet).map((chave) => (
              chave !== 'residents' ? <td key={planet[chave]}>{planet[chave]}</td> : null
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
