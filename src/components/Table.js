import React, { useContext } from 'react';

import ApiContext from '../contexts/ApiContext';
import PlanetsList from './PlanetsList';
import FiltersBox from './FiltersBox';

const Table = () => {
  const { isFetching } = useContext(ApiContext);
  if (isFetching) return <div>LOADING...</div>;
  return (
    <div>
      <FiltersBox />
      <PlanetsList />
    </div>
  );
};

export default Table;
