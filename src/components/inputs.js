import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/inputs.css';

function Inputs() {
  const { setFilters } = useContext(StarWarsContext);

  const setFilteredWord = (word) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      filters: prevFilter.filters.map((elem, index) => {
        if (index === 0) {
          return { ...elem, name: word };
        }
        return elem;
      }),
    }));
  };

  return (
    <div className="input-container">
      <div className="input-title">Pesquisar</div>
      <input
        className="input-name"
        placeholder="Procurar planeta"
        onChange={(e) => setFilteredWord(e.target.value)}
      />
    </div>
  );
}

export default Inputs;
