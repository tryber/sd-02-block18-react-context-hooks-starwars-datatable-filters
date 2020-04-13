import React, { useContext } from 'react';

import ApiContext from '../contexts/ApiContext';
import PlanetsList from './PlanetsList';
import FiltersBox from './FiltersBox';

const Table = () => {
  const { isFetching, error } = useContext(ApiContext);
  if (isFetching) return <div>LOADING...</div>;
  if (error) return <div>FETCH: ERROR</div>;
  return (
    <div>
      <FiltersBox />
      <PlanetsList />
    </div>
  );
};

export default Table;
