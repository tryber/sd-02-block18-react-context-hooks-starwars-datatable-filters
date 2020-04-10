import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const PlanetsDBContext = createContext();

export default function PlanetsDBProvider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState([{ name: '' }]);

  const store = {
    data: [planetsData, setPlanetsData],
    loading: [isLoading, setIsLoading],
    filters: [filters, setFilters],
  };

  return <PlanetsDBContext.Provider value={store}>{children}</PlanetsDBContext.Provider>;
}

PlanetsDBProvider.propTypes = {
  children: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
