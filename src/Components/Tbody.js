import React, { useContext } from 'react';
import SwContext from '../Context';

const filterReturn = (numericValues, filteredData) => {
  let returnFiltered = filteredData;
  numericValues.forEach((filter) => {
    const { column, comparison, value } = filter;

    switch (comparison) {
      case 'bigger_than':
        returnFiltered = returnFiltered.filter((planet) => (
          Number(planet[column]) > Number(value)
        ));
        return returnFiltered;

      case 'less_than':
        returnFiltered = returnFiltered.filter((planet) => (
          Number(planet[column]) < Number(value)
        ));
        return returnFiltered;

      case 'equal_to':
        returnFiltered = returnFiltered.filter((planet) => (
          Number(planet[column]) === Number(value)
        ));
        return returnFiltered;

      default: return filteredData;
    }
  });
  return returnFiltered;
};

const isNumber = (cellValue) => {
  const cell = cellValue === 'unknown' ? 0 : cellValue;
  return parseInt(cell, 10) >= 0
    ? parseInt(cell, 10)
    : cell;
};

const allSort = (sorted, haveFilters) => {
  const arrayFilters = haveFilters ? [...haveFilters] : [];
  let isBigger = 0;
  return arrayFilters.length > 0 && sorted.column
    ? arrayFilters.sort((next, prev) => {
      const value = sorted.column.toLowerCase().replace(' ', '_');
      isBigger = isNumber(next[value]) > isNumber(prev[value]) ? 1 : -1;
      return sorted.order === 'ASC'
        ? isBigger : isBigger * -1;
    })
    : arrayFilters;
};

const Tbody = () => {
  const { planetsToFilter, filters, sortFilters } = useContext(SwContext);
  const filteredWithNumbers = filterReturn(filters, planetsToFilter);
  const toTable = allSort(sortFilters, filteredWithNumbers);
  return (
    <tbody>
      {toTable.map((planet) => (
        <tr key={`${planet.name} row values`}>
          {Object.values(planet).map((value, index) => (
            Object.keys(planet)[index] !== 'residents'
              ? <td key={`${value} cell`}>{value}</td>
              : null
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
