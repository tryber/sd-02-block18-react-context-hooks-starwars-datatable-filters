import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const FiltersList = () => {
  const { filters } = useContext(StarWarsContext);
  const [, ...rest] = filters;
  return (
    <section>
      {rest.map(({ numericValues: { column, comparison, value } }) => (
        <div className="column-filters" key={column}>
          <p className="column-filter" name={column}>{`☉ ${column.replace('_', ' ')} ${comparison.toLowerCase()} ${value}`}</p>
          {/* <button type="button" name={column} onClick={this.deleteClick}>X</button> */}
        </div>
      ))}
    </section>
  );
};

export default FiltersList;
