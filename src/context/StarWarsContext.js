import React, { createContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import callFetchPlanets from '../services/swAPI';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const colsSelect = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [filters, setFilters] = useState([{ name: '' }]);
  const [columnsSelect, setColumnsSelect] = useState(colsSelect);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');

  const requestPlanetsSuccess = (dataJson) => {
    setData(dataJson.results);
    setIsFetching(false);
  };

  const requestPlanetsFailure = (errorMsg) => {
    setError(errorMsg);
    setIsFetching(false);
  };

  const removeFilter = (columns) => {
    const onlyNumeric = filters.slice(1);
    const numericRemove = onlyNumeric.filter(
      (item) => item.numericValues.column !== columns,
    );
    setColumnsSelect(columnsSelect.concat(columns));
    setFilters([filters[0], ...numericRemove]);
  };

  const filterButton = (columns) => (
    <button
      type="button"
      data-testid={`saved-filters-button-${columns}`}
      onClick={() => removeFilter(columns)}
    >
      Apagar filtro
    </button>
  );

  useEffect(() => {
    setIsFetching(true);
    callFetchPlanets()
      .then(
        (dataJson) => requestPlanetsSuccess(dataJson),
        (errorJson) => requestPlanetsFailure(errorJson.message),
      );
  }, []);

  const filterTable = () => {
    const onlyNumeric = filters.slice(1);
    let dataF = data;
    onlyNumeric.forEach((item) => {
      const { numericValues: num } = item;
      switch (num.comparison) {
        case 'maior que':
          dataF = dataF.filter((planet) => planet[num.column] > parseInt(num.value, 10));
          return dataF;
        case 'menor que':
          dataF = dataF.filter((planet) => planet[num.column] < parseInt(num.value, 10));
          return dataF;
        default:
          dataF = dataF.filter((planet) => planet[num.column] === num.value);
          return dataF;
      }
    });
    return dataF;
  };

  const tableHead = () => {
    const prettyHeader = Object.keys(data[0] || []).filter((header) => ((header !== 'residents')));
    return (
      <thead>
        <tr>
          {prettyHeader.map((header) => (
            <th className="tableHeader" key={header}>
              {header.substring(0, 1).toUpperCase()
                .concat(header.substring(1)).replace('_', ' ')}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const tableData = () => {
    const [{ name }] = filters;
    const planets = filterTable();
    const filterPlanet = planets.filter(
      (planet) => planet.name.toLowerCase().includes(name.toLowerCase()),
    );
    return (
      filterPlanet.map((info) => (
        <tbody key={info.name}>
          <tr>
            {Object.values(info).map((body, idx) => {
              if (idx !== 9) {
                return (
                  <td className="tableData" key={body}>{body}</td>
                );
              }
              return null;
            })}
          </tr>
        </tbody>
      )));
  };

  const selectColumn = () => (
    <div>
      <select
        onChange={(e) => setColumn(e.target.value)}
        data-testid="boxColumn"
        name="column"
        value={column}
      >
        <option value="" hidden>Escolha uma coluna</option>
        {columnsSelect.map((item) => {
          const visual = item.substring(0, 1).toUpperCase()
            .concat(item.substring(1)).replace('_', ' ');
          return <option key={item} value={item}>{visual}</option>;
        })}
      </select>
    </div>
  );

  const selectComparison = () => (
    <div>
      <select
        onChange={(e) => setComparison(e.target.value)}
        data-testid="boxComparison"
        name="comparison"
        value={comparison}
      >
        <option value="" hidden>Escolha uma comparador</option>
        <option value="maior que">Maior que</option>
        <option value="menor que">Menor que</option>
        <option value="igual a">Igual a</option>
      </select>
    </div>
  );

  const inputValue = () => (
    <div>
      <input
        onChange={(e) => setValue(e.target.value)}
        data-testid="boxValue"
        type="number"
        placeholder="Digite aqui"
        name="value"
        value={value}
      />
    </div>
  );

  const nameFilter = (nome) => {
    const [, ...rest] = filters;
    setFilters([{ name: nome }, ...rest]);
  };

  const numberFilter = (numericValues) => {
    const columnFilter = columnsSelect.filter((item) => item !== column);
    setColumnsSelect(columnFilter);
    setFilters([...filters, { numericValues }]);
  };

  const createFilter = () => {
    const numericValues = { column, comparison, value };
    numberFilter(numericValues);
    setColumn('');
    setComparison('');
    setValue('');
  };

  const buttonFilter = () => {
    let isDisabled = 0;
    isDisabled = (column === '' || comparison === '' || value === '');
    return (
      <button
        onClick={() => createFilter()}
        data-testid="buttonFilter"
        type="button"
        disabled={(isDisabled)}
      >
        Fazer busca
      </button>
    );
  };

  const renderNumValues = () => (
    (columnsSelect.length === 0)
      ? <div data-testid="noFilter">Não sobraram filtros para utilizar!</div>
      : (
        <div className="flexy-number-filters">
          {selectColumn()}
          {selectComparison()}
          {inputValue()}
          {buttonFilter()}
        </div>
      )
  );

  const context = {
    isFetching,
    data,
    error,
    filters,
    columnsSelect,
    column,
    comparison,
    value,
    filterButton,
    tableHead,
    tableData,
    requestPlanetsSuccess,
    requestPlanetsFailure,
    selectColumn,
    selectComparison,
    inputValue,
    buttonFilter,
    nameFilter,
    renderNumValues,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { StarWarsContext, StarWarsProvider };
