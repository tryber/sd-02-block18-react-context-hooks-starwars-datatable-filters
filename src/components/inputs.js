import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Inputs() {
  const { setFilteredWord } = useContext(StarWarsContext);

  return (
    <div>
      <div>
        Digite a palavra:
        <input
          placeholder="Procurar planeta"
          onChange={(e) => setFilteredWord(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Inputs;
