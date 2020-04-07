import React, { useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

const Thead = () => {
  const { data } = useContext(starWarsContext);
  return (
    <thead>
      <tr>
        {Object.keys(data[0])
          .map((infoPlanets) => (infoPlanets !== 'residents') && <th key={infoPlanets}>{infoPlanets}</th>)}
      </tr>
    </thead>
  );
};

export default Thead;
