import React, { useContext } from 'react';

import StarWarsContext from '../context/StarWarsContext';

function Panel() {
  const { planets, params } = useContext(StarWarsContext);

  return (
    <table data-testid="table">
      <thead>
        <tr>
          {params.map((key) => (
            <td key={`thead-${key}`}>{key}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <tr key={planet.name}>
            {Object.keys(planet).map((key) => (
              <td key={planet.name + key}>{planet[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Panel;
