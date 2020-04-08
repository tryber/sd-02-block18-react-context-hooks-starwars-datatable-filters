import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/tableContent.css';

function Table() {
  const { data, filters } = useContext(StarWarsContext);

  useEffect(() => {
  }, [filters]);

  const headerTable = Object.keys(data[0]);
  console.log('rerender');
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
