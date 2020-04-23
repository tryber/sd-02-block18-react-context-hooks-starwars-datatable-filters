import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';
import filterCondition from '../conditionFunction/filterCondition';
import getEndPointSwAPI from '../service/SwAPI';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [dataMock, setDataMock] = useState([]);
  const [dataMockFilter, setDataMockFilter] = useState([]);
  const [dataMockOn, setDataMockOn] = useState(false);
  const [dataMockFilterOn, setDataMockFilterOn] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const [filters, setFilters] = useState([]);
  const [value, setValue] = useState('');
  const [valueOn, setValueOn] = useState(false);
  const [column, setColumn] = useState('');
  const [columnOn, setColumnOn] = useState(false);
  const [comparisson, setComparisson] = useState('');
  const [comparissonOn, setComparissonOn] = useState(false);
  const [arrDrop, setArrDrop] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const callAPI = () => {
    getEndPointSwAPI()
    .then(
      (datas) => {
        setData(datas.results);
        setDataMockFilter(datas.results);
        return setDataMock(datas.results);
      },
      (errors) => setError(errors.message),
    );
    setOnLoad(true);
  };

  const removeFilter = (valColumn) => {
    const newNumeric = filters.filter((element) => {
      const isValid = (Object.keys(element).includes('numericValues'))
      ? element.numericValues.column !== valColumn
      : element;
      return isValid;
    });
    filterCondition(newNumeric, data, setDataMock, setDataMockFilter);
    setFilters([...newNumeric]);
    setArrDrop([valColumn, ...arrDrop]);
  };

  const updateArrDrop = (currColumn) => {
    const newArr = arrDrop.filter((arr) => arr !== currColumn);
    return newArr;
  };

  const updateFilters = () => {
    setDataMockFilterOn(true);
    const numericValues = { column, comparisson, value };
    const newNumeric = [...filters, { numericValues }];
    setFilters(newNumeric);
    const setArr = updateArrDrop(column);
    filterCondition(newNumeric, data, setDataMock, setDataMockFilter);
    setColumn('');
    setValue('');
    setColumnOn(false);
    setValueOn(false);
    setArrDrop(setArr);
  };

  const updateValue = (e) => {
    setValue((e.target.value >= 0) ? e.target.value : 0);
    setValueOn(true);
  };

  const updateDropDown = (dropDownValue) => {
    setColumn(dropDownValue);
    setColumnOn(true);
  };

  const updateCondition = (conditionValue) => {
    setComparisson(conditionValue);
    setComparissonOn(true);
  };

  const context = {
    data,
    error,
    dataMock,
    setDataMock,
    dataMockFilter,
    setDataMockFilter,
    dataMockOn,
    setDataMockOn,
    dataMockFilterOn,
    setDataMockFilterOn,
    onLoad,
    filters,
    setFilters,
    callAPI,
    updateFilters,
    value,
    column,
    comparisson,
    updateValue,
    updateDropDown,
    updateCondition,
    valueOn,
    columnOn,
    comparissonOn,
    arrDrop,
    removeFilter,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

export { StarWarsContext, StarWarsProvider };

StarWarsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
