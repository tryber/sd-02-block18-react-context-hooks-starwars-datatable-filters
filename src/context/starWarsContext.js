import React, { createContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import fetchPlanetFromServices from '../services/swAPI';

const SWContext = createContext();

const SWProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const allColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [columnOptions, setColumnOptions] = useState(allColumns);
  const [columnValue, setColumnValue] = useState('');
  const [comparisonValue, setComparisonValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [filters, setFilters] = useState([{ column: '', comparison: '', value: '' }]);
  const handleSWSuccess = (response) => {
    const { results } = response;
    setData(results);
  };
  const handleSWFailure = (response) => {
    setError(response.error.message);
  };
  useEffect(() => {
    fetchPlanetFromServices()
      .then(
        (response) => handleSWSuccess(response),
        (response) => handleSWFailure(response),
      );
  }, []);
  const generateColumns = () => (
    <div>
      <select
        onChange={(e) => setColumnValue(e.target.value)}
        value={columnValue}
      >
        <option value="" hidden>Select Column</option>
        {columnOptions.map((option) => <option key={option} name="column" value={option}>{option}</option>)}
      </select>
    </div>
  );
  const generateComparison = () => {
    const comparison = ['more than', 'equal to', 'less than'];
    return (
      <select onChange={(e) => setComparisonValue(e.target.value)}>
        <option value="">Select Comparison</option>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  };
  const generateNumeric = () => (
    <input
      type="number"
      placeholder="type a number here!"
      value={numberValue}
      onChange={(e) => setNumberValue(e.target.value)}
    />
  );
  const filterByText = (string) => {
    setText(string);
  };
  const numberFilter = (newNumericValues) => {
    const columnFilter = columnOptions.filter((item) => item !== columnValue);
    setColumnOptions(columnFilter);
    setFilters(filters[0].column === ''
      ? [newNumericValues]
      : filters.concat(newNumericValues));
  };
  const createFilter = () => {
    const newNumericValues = { columnValue, comparisonValue, numberValue };
    numberFilter(newNumericValues);
    setColumnValue('');
    setComparisonValue('');
    setNumberValue('');
  };
  const numericFilters = () => {
    console.log(filters);
    const { column, comparison, value } = filters;
    console.log(column);
    const columnBool = (column !== '' && value !== '');
    if (comparison === 'more than' && columnBool) {
      console.log('hi!');
      return data.filter((planet) => Number(planet[column]) > Number(value));
    }
    if (comparison === 'less than' && columnBool) {
      return data.filter((planet) => Number(planet[column]) < Number(value));
    }
    if (comparison === 'equal to' && columnBool) {
      return data.filter((planet) => Number(planet[column]) === Number(value));
    }
    return data;
  };
  const generateBody = () => {
    let firstFilter = data;
    filters.forEach((x) => { firstFilter = numericFilters(firstFilter, x); });
    console.log(firstFilter);
    return (
      firstFilter
        .filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
        .map((values) => (
          <tbody key={values.name}>
            <tr>
              {Object.values(values).map((box, index) => (index !== 9
                && <td className="tableData" data-testid={box} key={box}>{box}</td>
              ))}
            </tr>
          </tbody>
        )));
  };
  const generateTable = () => {
    if (data) {
      return (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((item) => (item !== 'residents'
                && <th className="tableHeader" key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          {data && generateBody(data, text, filters)}
        </table>
      );
    }
    if (error) { return <div>{error}</div>; }
    return <div>Loading...</div>;
  };
  const buttonFilters = () => (
    <button type="button" onClick={() => createFilter()}>Filter!</button>
  );
  // export
  const context = {
    data,
    error,
    generateColumns,
    generateComparison,
    generateNumeric,
    setColumnOptions,
    comparisonValue,
    generateTable,
    buttonFilters,
    filters,
    setFilters,
    text,
    filterByText,
  };
  // render
  return (
    <SWContext.Provider value={context}>
      {children}
    </SWContext.Provider>
  );
};

export { SWContext, SWProvider };

SWProvider.propTypes = {
  children: propTypes.node.isRequired,
};
