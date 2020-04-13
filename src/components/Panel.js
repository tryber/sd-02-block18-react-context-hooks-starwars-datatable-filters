import React, { useContext } from 'react';

import FilterContext from '../context/Context';
import Filters from './Filters';

function Panel() {
  const { planets, params } = useContext(FilterContext);

  return (
    <div className="complete-panel">
      <Filters />
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
    </div>
  );
}

export default Panel;
