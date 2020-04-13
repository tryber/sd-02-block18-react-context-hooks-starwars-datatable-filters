import React, { useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

const Thead = () => {
  const { data, filtersAscDesc } = useContext(starWarsContext);
  return (
    <thead>
      <tr>
        {Object.keys(data[0])
          .map((infoPlanets) => (infoPlanets !== 'residents')
            && (
              <th key={infoPlanets}>
                <button
                  data-testid={infoPlanets}
                  type="button"
                  value={infoPlanets}
                  onClick={({ target }) => filtersAscDesc(target.value)}
                >
                  {infoPlanets}
                </button>
              </th>
            ))}
      </tr>
    </thead>
  );
};

export default Thead;
