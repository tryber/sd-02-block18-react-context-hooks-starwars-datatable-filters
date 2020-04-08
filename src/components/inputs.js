import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Inputs() {
  const { setFilters } = useContext(StarWarsContext);

  const setFilteredWord = (word) => {
    setFilters((prevFilter) => {
      return {
        ...prevFilter,
        filters: prevFilter.filters.map((elem, index) => {
          if (index === 0) {
            return { ...elem, name: word };
          }
          return elem;
        }),
      };
    });
  };

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
