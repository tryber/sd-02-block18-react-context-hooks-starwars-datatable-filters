import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const FiltersList = () => {
  const { filters, setFilters } = useContext(StarWarsContext);
  const [, ...rest] = filters;

  function deleteFilter(currentColumn) {
    const remainedColumns = rest
      .filter(({ numericValues: { column } }) => column !== currentColumn);
    setFilters([filters[0], ...remainedColumns]);
  }

  return (
    <section>
      {rest.map(({ numericValues: { column, comparison, value } }) => (
        <div className="column-filters" key={column}>
          <p className="column-filter" name={column}>{`☉ ${column.replace('_', ' ')} ${comparison.toLowerCase()} ${value}`}</p>
          <button
            type="button"
            name={column}
            onClick={() => {
              deleteFilter(column);
            }}
          >
            X
          </button>
        </div>
      ))}
    </section>
  );
};

export default FiltersList;
