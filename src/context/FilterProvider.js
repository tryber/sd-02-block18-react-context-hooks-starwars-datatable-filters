import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import StarWarsContext from './StarWarsContext';
import fetchApi from '../services/api';

const planetsParams = [{
  name: '',
  rotation_period: '',
  orbital_period: '',
  diameter: '',
  climate: '',
  gravity: '',
  terrain: '',
  surface_water: '',
  population: '',
}];

const params2 = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url',
];

const typeParam2 = [
  'rotation_period',
  'orbital_period',
  'diameter',
  'surface_water',
  'population',
];

const filtersParams = {
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        column: '',
        comparison: '',
        value: '',
      },
    },
  ],
};

const switchComparison = (filterPlanets, column, comparison, value) => {
  switch (comparison) {
    case '':
      return filterPlanets;
    case 'Maior que':
      return filterPlanets
        .filter((planet) => Number(planet[column]) > Number(value));
    case 'Menor que':
      return filterPlanets
        .filter((planet) => Number(planet[column]) < Number(value));
    case 'Igual a':
      return filterPlanets
        .filter((planet) => Number(planet[column]) === Number(value));
    default:
      return null;
  }
};

const switchValeu = (filterPlanets, column, comparison, value) => {
  switch (value) {
    case '':
      return filterPlanets;
    default:
      return switchComparison(filterPlanets, column, comparison, value);
  }
};

const switchColumn = (filterPlanets, column, comparison, value) => {
  switch (column) {
    case '':
      return filterPlanets;
    default:
      return switchValeu(filterPlanets, column, comparison, value);
  }
};

const FilterProvider = ({ children }) => {
  const [planets, setPlanets] = useState(planetsParams);
  const [data, setData] = useState(planetsParams);
  const [params] = useState(params2);
  const [typeParam, setTypeParam] = useState(typeParam2);
  const [filters, setFilters] = useState(filtersParams);


  const switchName = (filterPlanets, name) => ((filterPlanets.length > 0)
    ? filterPlanets
      .filter((planet) => planet.name.includes(name))
    : data);

  const filterByName = (filterPlanets) => {
    const { name } = filters.filters[0];
    return switchName(filterPlanets, name);
  };


  const filterByNumber = (filterPlanets, index) => {
    const { column, comparison, value } = filters.filters[index].numericValues;
    return switchColumn(filterPlanets, column, comparison, value);
  };

  const filterByNumbers = (filterPlanets) => {
    const filters2 = filters.filters.slice(1, filters.filters.length);
    return filters2
      .reduce((acc, val, index) => filterByNumber(acc, index + 1), filterPlanets);
  };

  useEffect(() => {
    fetchApi().then((dados) => {
      const dados2 = dados.map((dado) => {
        const obj = Object.entries(dado)
          .filter((entrie) => !(entrie[0] === 'residents'));
        return obj.reduce((acc, val) => {
          // eslint-disable-next-line prefer-destructuring
          acc[val[0]] = val[1];
          return acc;
        }, {});
      });
      setData(dados2); setPlanets(dados2);
    });
  }, []);

  useEffect(() => {
    const planets2 = filterByNumbers(filterByName(data));
    setPlanets(planets2);
  }, [filters]);

  const removeFilter = (index) => {
    filters.filters.splice(index, 1);
    setFilters({ ...filters });
  };

  const filterNameFunc = (name) => {
    filters.filters[0] = {
      name,
    };
    setFilters({ ...filters });
  };

  const filterTypeFunc = (column, index) => {
    const column1 = filters.filters[index].numericValues.column;
    filters.filters[index] = {
      numericValues: {
        ...filters.filters[index].numericValues,
        column,
      },
    };
    typeParam.splice(typeParam.indexOf(column), 1);

    if (column1.length > 0) {
      typeParam.push(column1);
    }

    setTypeParam(typeParam);
    setFilters({ ...filters });
  };

  const filterConditionFunc = (comparison, index) => {
    filters.filters[index] = {
      numericValues: {
        ...filters.filters[index].numericValues,
        comparison,
      },
    };
    setFilters({ ...filters });
  };

  const filterNumberFunc = (value, index) => {
    filters.filters[index] = {
      numericValues: {
        ...filters.filters[index].numericValues,
        value,
      },
    };
    setFilters({ ...filters });
  };

  const addFilter = () => {
    filters.filters = [
      ...filters.filters,
      {
        numericValues: {
          column: '',
          comparison: '',
          value: '',
        },
      },
    ];
    setFilters({ ...filters });
  };


  const contextValue = {
    filterConditionFunc,
    filterNameFunc,
    filterTypeFunc,
    filterNumberFunc,
    removeFilter,
    addFilter,
    planets,
    params,
    typeParam,
  };

  return (
    <StarWarsContext.Provider value={contextValue}>
      {children}
    </StarWarsContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
