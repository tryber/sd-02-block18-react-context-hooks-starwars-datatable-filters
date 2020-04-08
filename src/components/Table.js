import React, { useContext } from 'react';

import ApiContext from '../contexts/ApiContext';
import PlanetsList from './PlanetsList';

const Table = () => {
  const { isFetching } = useContext(ApiContext);
  if (isFetching) return <div>LOADING...</div>;
  return (
    <div>
      <PlanetsList />
    </div>
  );
};

export default Table;
