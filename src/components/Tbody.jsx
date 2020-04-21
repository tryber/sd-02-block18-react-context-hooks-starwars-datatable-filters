import React, { useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

const Tbody = () => {
  const { filtredPlanets } = useContext(starWarsContext);
  return (
    <tbody>
      {filtredPlanets.map((planet, index) => (
        <tr data-testid={`planet${index}`} key={planet.name}>
          {Object.values(planet)
            .map((keyPlanet, i) => (Object.keys(planet)[i] !== 'residents')
              && <td key={keyPlanet}>{keyPlanet}</td>)}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
