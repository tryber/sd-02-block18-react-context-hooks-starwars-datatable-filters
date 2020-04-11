import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const PlanetsDBContext = createContext();

export default function PlanetsDBProvider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState([
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '',
        value: 0,
      },
    },
  ]);

  const store = {
    data: [planetsData, setPlanetsData],
    loading: [isLoading, setIsLoading],
    filters: [filters, setFilters],
  };

  return <PlanetsDBContext.Provider value={store}>{children}</PlanetsDBContext.Provider>;
}
