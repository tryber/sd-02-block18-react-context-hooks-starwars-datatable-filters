import React, { useContext, useEffect } from 'react';
import starWarsContext from '../context/StarWarsContext';

const Table = () => {
  const {
    fetchPlanets, error, isFetching, planets,
  } = useContext(starWarsContext);
  useEffect(() => {
    fetchPlanets();
  }, []);

  if (!isFetching) return <h1>Loading</h1>;
  return (error
    || (
      <div>
        <h1>Starwars Planets</h1>
        <table border="1px">
          <thead>
            <tr>
              {Object.keys(planets[0])
                .map((infoPlanets) => (infoPlanets !== 'residents') && <th key={infoPlanets}>{infoPlanets}</th>)}
            </tr>
          </thead>
          <tbody>
            {planets.map((planet) => (
              <tr key={planet.name}>
                {Object.values(planet)
                  .map((keyPlanet, index) => (Object.keys(planet)[index] !== 'residents')
                    && <td key={keyPlanet}>{keyPlanet}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Table;
