import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const numericFilters = (firstFilter, { numericValues }) => {
  const { column, comparison, value } = numericValues;
  const columnBool = (column !== '' && value !== '');
  if (comparison === 'more than' && columnBool) {
    return firstFilter.filter((planet) => planet[column] > parseInt(value, 10));
  }
  if (comparison === 'less than' && columnBool) {
    return firstFilter.filter((planet) => planet[column] < parseInt(value, 10));
  }
  if (comparison === 'equal to' && columnBool) {
    return firstFilter.filter((planet) => planet[column] === parseInt(value, 10));
  }
  return firstFilter;
};

const generateBody = (data, text, filters) => {
  let firstFilter = data;
  filters.forEach((x) => { firstFilter = numericFilters(firstFilter, x); });
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

const GenerateTable = () => {
  const {
    data,
    error,
    filters,
    text,
  } = useContext(SWContext);

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

export default GenerateTable;
