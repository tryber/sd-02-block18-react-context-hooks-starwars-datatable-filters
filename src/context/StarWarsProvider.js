import React, { useState } from 'react';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const initialSelectors = ['coluna', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [selectors, setSelectors] = useState(initialSelectors);
  const context = {
    initial: 'contexto acessdo com êxito',
    selectors,
  };

  return (
    <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>
  );
};

export default StarWarsProvider;
