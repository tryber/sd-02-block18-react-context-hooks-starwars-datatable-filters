import React, { useState, useContext, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import './Selectors.css';


const Selectors = () => {
  const { data, state, filteredData, filterByColumn } = useContext(StarWarsContext);
  const { filters } = state;
  const [numericFilter, setNumericFilter] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  useEffect(() => {
    return (() => setNumericFilter({
      column: '',
      comparison: '',
      value: '',
    }));
  }, []);

  // deleteClick(event) {
  //   const { name } = event.target;
  //   const { data, filters, deleteFilter } = this.props;

  //   deleteFilter(data, name, filters);
  // }

  function renderColumnSelector() {
    const columns = ['rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population'];
    const selectedColumn = filters.map((el) => (
      el.numericValues ? el.numericValues.column : false));
    return (
      <div>
        <span className="selector-label">Choose a column:</span>
        <select
          name="column"
          onChange={({
            target: { name, value },
          }) => setNumericFilter({ ...numericFilter, [name]: value })}
          required
        >
          <option value="" label=" " />
          {columns.map((element) => (
            selectedColumn.includes(element)
              ? false
              : <option value={element} key={element}>{element.replace('_', ' ')}</option>
          ))}
        </select>
      </div>
    );
  }

  function renderFilterButton() {
    const { column, comparison, value } = numericFilter;
    return (
      <input
        type="reset"
        value="Filtrar"
        onClick={() => filterByColumn(
          filters[0].name, data, column, comparison, value, filters, filteredData,
        )}
        disabled={!(column && comparison && value)}
      />
    );
  }

  function renderFilters() {
    const [, ...rest] = filters;
    // if (rest.length) {

    // }
    return (
      <section>
        {rest.map(({ numericValues: { column, comparison, value } }) => (
          <div className="column-filters">
            <p className="column-filter" name={column}>{`☉ ${column.replace('_', ' ')} ${comparison.toLowerCase()} ${value}`}</p>
            {/* <button type="button" name={column} onClick={this.deleteClick}>X</button> */}
          </div>
        ))}
      </section>
    );
    // return false;
  }

  return (
    <div>
      <form>
        {renderColumnSelector()}
        <div>
          <span className="selector-label">Choose a comparison:</span>
          <select
            name="comparison"
            onChange={({
              target: { name, value },
            }) => setNumericFilter({ ...numericFilter, [name]: value })}
            required
          >
            <option value="" label=" " />
            <option value="Maior que">Maior que</option>
            <option value="Menor que">Menor que</option>
            <option value="Igual a">Igual a</option>
          </select>
        </div>
        <div className="group number-selector">
          <input
            type="number"
            name="value"
            onChange={({
              target: { name, value },
            }) => setNumericFilter({ ...numericFilter, [name]: value })}
            required
            id="number-bar"
          />
          <span className="highlight" />
          <span className="bar" />
          <label htmlFor="number-bar">Type a number</label>
        </div>
      </form>
      {renderFilterButton()}
      {renderFilters()}
    </div>
  );
};

export default Selectors;
