import React from 'react';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const context = {
    initial: 'contexto acessdo com êxito',
  };

  return (
    <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>
  );
};

export default StarWarsProvider;
