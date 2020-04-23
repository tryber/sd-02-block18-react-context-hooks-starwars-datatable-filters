import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import AllFilters from './AllFilters';

const ButtonSearch = () => {
  const { valueOn, columnOn, comparissonOn, updateFilters,
    dataMockFilterOn } = useContext(StarWarsContext);

  return (
    <React.Fragment>
      {(valueOn && columnOn && comparissonOn)
          ? <button onClick={() => updateFilters()}>Search</button>
          : <button disabled>Search</button>
      }
      {dataMockFilterOn ? <AllFilters /> : <div style={{ display: 'none' }} />}
    </React.Fragment>
  );
};

export default ButtonSearch;
