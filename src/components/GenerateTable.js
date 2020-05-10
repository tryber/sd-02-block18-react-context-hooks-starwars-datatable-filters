import React, { useContext, useEffect } from 'react';
import SWContext from '../context/starWarsContext';
import fetchPlanetFromServices from '../services/swAPI';

const GenerateTable = () => {
  const {
    data,
    setData,
    error,
    setError,
    filters,
    text,
  } = useContext(SWContext);
  const handleSWSuccess = (response) => {
    const { results } = response;
    setData(results.sort((a, b) => (a.name > b.name ? 1 : -1)));
  };
  const handleSWFailure = (response) => {
    setError(response.message);
  };
  useEffect(() => {
    fetchPlanetFromServices()
      .then(
        (response) => handleSWSuccess(response),
        (response) => handleSWFailure(response),
      );
  }, []);
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
  const generateBody = () => {
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
