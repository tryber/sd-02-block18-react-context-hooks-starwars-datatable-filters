import React, { createContext } from 'react';
import PropTypes, { object } from 'prop-types';

export const PlanetsDBContext = createContext();

export default function PlanetsDBProvider({ children }) {
  const [planetsData, setPlanetsData] = React.useState({ data: [] });

  const store = {
    data: [planetsData, setPlanetsData],
  };

  return <PlanetsDBContext.Provider value={store}>{children}</PlanetsDBContext.Provider>;
}

PlanetsDBProvider.propTypes = {
  children: PropTypes.instanceOf(object).isRequired,
};
