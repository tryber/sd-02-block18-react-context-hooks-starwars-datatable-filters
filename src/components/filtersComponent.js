import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Filters from './filters';
import FilterButton from './filterButton';

const FiltersComponent = () => {
  const { selectors } = useContext(StarWarsContext);
  console.log(selectors.length);
  return (
    <div>
      {selectors.length !== 1 && <Filters />}
      {selectors.length !== 1 && <FilterButton />}
    </div>
  );
};

export default FiltersComponent;
