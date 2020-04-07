import React, { useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

const Tbody = () => {
  const { filtredPlanets = [] } = useContext(starWarsContext);
  return (
    <tbody>
      {filtredPlanets.map((planet) => (
        <tr key={planet.name}>
          {Object.values(planet)
            .map((keyPlanet, index) => (Object.keys(planet)[index] !== 'residents')
              && <td key={keyPlanet}>{keyPlanet}</td>)}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
