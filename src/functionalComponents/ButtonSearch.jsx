import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const ButtonSearch = () => {
  const { valueOn, columnOn, comparissonOn, updateFilters,
    dataMockFilterOn, allFilters } = useContext(StarWarsContext);

  return (
    <React.Fragment>
      {(valueOn && columnOn && comparissonOn)
          ? <button onClick={() => updateFilters()}>Search</button>
          : <button disabled>Search</button>
      }
      {dataMockFilterOn ? allFilters() : <div style={{display: 'none'}}></div>}
    </React.Fragment>
  );
};

export default ButtonSearch;
