import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import './style/AllFilters.css';

const AllFilters = () => {
  const { filters, removeFilter } = useContext(StarWarsContext);
  const filterStore = filters.filter((element) =>
    Object.keys(element).includes('numericValues'));
    console.log(filterStore.length)
  if (filters !== undefined && filterStore.length !== 0) {
    return (
      <React.Fragment>
        {filterStore.map((filter) => {
          const { column, comparisson, value } = filter.numericValues;
          return (
            <div key={`${column}Filter`} className="containerFilters">
              <p>{column}</p>
              <p>{comparisson}</p>
              <p>{value}</p>
              <button value={column} onClick={(e) => removeFilter(e.target.value)}>X</button>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
  return (<div style={{display: 'none'}}></div>)
};

export default AllFilters;
