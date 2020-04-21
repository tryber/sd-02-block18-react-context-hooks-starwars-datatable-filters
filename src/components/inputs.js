import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/inputs.css';

function Inputs() {
  const { setFilters } = useContext(StarWarsContext);

  const setFilteredWord = (word) => {
    setFilters((prevFilter) => {
      const newFilter = [...prevFilter];
      newFilter[0] = { name: word };
      console.log(newFilter);
      return newFilter;
    });
  };

  return (
    <div className="input-container">
      <div className="input-title">Pesquisar</div>
      <input
        data-testid="name-inp"
        className="input-name"
        placeholder="Procurar planeta"
        onChange={(e) => setFilteredWord(e.target.value)}
      />
    </div>
  );
}

export default Inputs;
