import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const PlanetsDBContext = createContext();

export default function PlanetsDBProvider({ children }) {
  const [planetsData, setPlanetsData] = React.useState([]);

  const store = {
    data: [planetsData, setPlanetsData],
  };

  return <PlanetsDBContext.Provider value={store}>{children}</PlanetsDBContext.Provider>;
}

PlanetsDBProvider.propTypes = {
  children: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
