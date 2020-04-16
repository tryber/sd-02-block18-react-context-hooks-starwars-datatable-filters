import React, { Component, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchAPI from '../actions/fetchAPI';

import { Context } from '../context/Provider';

export function acertaTexto(texto) {
  const palavras = texto.split('_');
  const palavrasCapitalizadas = palavras.map((palavra) => `${palavra[0].toUpperCase()}${palavra.substr(1)}`);
  const titulo = palavrasCapitalizadas.join(' ');
  return titulo;
}

function comparaValores(arg1, arg2, comparison) {
  switch (comparison) {
    case '>':
      return arg1 > arg2;
    case '<':
      return arg1 < arg2;
    case '===':
      return arg1 === arg2;
    default:
      return false;
  }
}

function filterDataByName(data, name) {
  const newData = data.filter((item) => item.name.toUpperCase().includes(name.toUpperCase()));

  if (newData.length === 0) {
    return [{}];
  }

  return newData;
}

function filterDataByNumericValues(data, column, comparison, value) {
  if (value === '' || column === '') {
    return data;
  }

  const newData = data.filter((item) => (
    !(item[column] === 'unknown') && comparaValores(Number(item[column]), Number(value), comparison)),
  );

  return newData;
}

function renderizaATabela(dataTable, indexResidents, keysPlanet) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {keysPlanet.map((key) => <th key={key}>{acertaTexto(key)}</th>)}
          </tr>
        </thead>
        <tbody>
          {dataTable.map((planet) => {
            const valuesPlanet = Object.values(planet);
            valuesPlanet.splice(indexResidents, 1);
            return (
              <tr key={planet.name}>
                {valuesPlanet.map((valueColumn) => <td key={valueColumn}>{valueColumn}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Table() {
  // constructor(props) {
  //   super(props);
  //   this.setSortingRules = this.setSortingRules.bind(this);
  // }

  // componentDidMount() {
  //   const { getData } = this.props;
  //   getData();
  // }

  const { data, updateData, filters, filters: [{ name }], sorting: { column: columnToBeSorted, order } } = useContext(Context);

  function setSortingRules(obj1, obj2) {
    // const { columnToBeSorted, order } = this.props;

    if (obj1[columnToBeSorted] === 'unknown'
      || (Number(obj1[columnToBeSorted]) > Number(obj2[columnToBeSorted]) && order === 'ASC')
      || (Number(obj1[columnToBeSorted]) < Number(obj2[columnToBeSorted]) && order === 'DESC')) {
      return 1;
    }

    return -1;
  }

  useEffect(
    updateData,
    [],
  );

  function filterData() {
    // const { data, name, arrayColumns } = this.props;
    const arrayColumns = filters.slice(1).map((item) => item.numericValues.column);
    const objectStates = filters.slice(1).reduce((acc, current, i) => ({
      ...acc,
      [`valueSelectedColumn${i + 1}`]: current.numericValues.column,
      [`valueSelectedComparison${i + 1}`]: current.numericValues.comparison,
      [`valueNumber${i + 1}`]: current.numericValues.value,
    }), {});

    let newData = data;
    for (let i = 0; i < arrayColumns.length; i += 1) {
      newData = filterDataByNumericValues(
        newData,
        objectStates[`valueSelectedColumn${i + 1}`],
        objectStates[`valueSelectedComparison${i + 1}`],
        objectStates[`valueNumber${i + 1}`],
      );
    }

    return filterDataByName(newData, name);
  }

  function filterAndSortData() {
    // const { columnToBeSorted, order } = this.props;
    const filteredData = filterData();

    if (columnToBeSorted === 'name') {
      const filteredColumns = filteredData.map((object) => object[columnToBeSorted]);
      filteredColumns.sort();
      const sortedData = filteredColumns.map((column) => (
        filteredData.find((object) => object[columnToBeSorted] === column)
      ));

      if (order === 'DESC') {
        sortedData.reverse();
      }

      return sortedData;
    }

    filteredData.sort(setSortingRules);
    return filteredData;
  }

  // render() {
  // const dataTable = this.filterAndSortData();

  // const dataTable = filterDataByName(data, name);
  // const dataTable = filterData();
  const dataTable = filterAndSortData();

  const keysPlanet = Object.keys(dataTable[0]);
  const indexResidents = keysPlanet.indexOf('residents');
  keysPlanet.splice(indexResidents, 1);

  return renderizaATabela(dataTable, indexResidents, keysPlanet);
}

const mapStateToProps = (state) => {
  const data = state.data;
  const name = state.filters[0].name;
  const columnToBeSorted = state.sorting.column;
  const order = state.sorting.order;
  const arrayColumns = state.filters.slice(1).map((item) => item.numericValues.column);
  const objectStates = state.filters.slice(1).reduce((acc, current, i) => ({
    ...acc,
    [`valueSelectedColumn${i + 1}`]: current.numericValues.column,
    [`valueSelectedComparison${i + 1}`]: current.numericValues.comparison,
    [`valueNumber${i + 1}`]: current.numericValues.value,
  }), {});

  return { ...objectStates, /*data,*/ name, columnToBeSorted, order, arrayColumns };
};

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(fetchAPI()),
});

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  columnToBeSorted: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  arrayColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  getData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
