import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/tableContent.css';

function Table() {
  const { data } = useContext(StarWarsContext);

  // useEffect(() => {
  //   const planets = !filteredWord ? data
  //     : data.filter((planet) => planet.name.toLowerCase().includes(filteredWord.toLowerCase()));

  // }, [filteredWord]);

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
