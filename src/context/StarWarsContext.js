import React, { createContext, useState } from 'react';
import conditionFunction from '../conditionFunction/conditionFunction';
import propTypes from 'prop-types';
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

  const allFilters = () => {
    if (filters !== undefined) {
      return (
        <React.Fragment>
          {filters.map((filter) => {
            const { column, comparisson, value } = filter.numericValues;
            return (
              <div key={column}>
                <p>{column}</p>
                <p>{comparisson}</p>
                <p>{value}</p>
                <button>X</button>
              </div>
            );
          })}
        </React.Fragment>
      );
    }
  };

  const cellTable = () => {
    return (
      dataMock.map((result) => (
        <tbody key={result.name}>
          <tr>
            {Object.values(result).map((item, index) => {
              if (index !== 9) {
                return (
                  <td key={item}>{item}</td>
                );
              }
              return null;
            })}
          </tr>
        </tbody>
      ))
    );
  };

  const updateFilters = () => {
    const numericValues = { column, comparisson, value };
    const newFilters = [...filters, { numericValues }];
    setFilters(newFilters);
    filterCondition(newFilters);
    const setArr = updateArrDrop(column);
    setColumn('');
    setValue('');
    setColumnOn(false);
    setValueOn(false);
    setArrDrop(setArr);
  }

  const updateArrDrop = (currColumn) => {
    const newArr = arrDrop.filter((arr) => arr !== currColumn);
    return newArr;
  }

  const filterCondition = (newFilters) => {
    const filterStore = newFilters.filter((element) =>
    !Object.keys(element).includes('name'));
    setDataMockFilterOn(true);
    const mappedMockResult = data.filter((result) => {
        let isValid = true;
        filterStore.forEach((filter) => {
            isValid = isValid && conditionFunction(Number(result[filter.numericValues.column]),
                                                filter.numericValues.comparisson,
                                                Number(filter.numericValues.value));
          });
          return isValid;
        });
    setDataMock(mappedMockResult);
    return setDataMockFilter(mappedMockResult);
  };

  const filterResults = (whosFilter, planet) => {
    const filteredResult = whosFilter.map((result) => {
      const filter = (result.name.toUpperCase().includes(planet.toUpperCase()))
    ? result
    : [];
      return filter;
    });
    return filteredResult;
  };

  const planetAction = (planet) => {
    let whosFilter = data;
    if (dataMockFilterOn) {
      whosFilter = dataMock;
    }
    const filteredResult = filterResults(whosFilter, planet);
    const filterWithoutUndefined = filteredResult.filter((element) => element.length !== 0);
    const planetCase = planet.charAt(0).toUpperCase() + planet.substring(1);
    if (dataMockFilterOn) {
      const [, ...rest] = filters;
      setFilters([{ name: planetCase }, ...rest]);
      return setDataMockFilter(filterWithoutUndefined);
    } else {
      const [, ...rest] = filters;
      setFilters([{ name: planetCase }, ...rest]);
      return setDataMock(filterWithoutUndefined);
    }
  };

  const updateValue = (e) => {
    setValue((e.target.value >= 0) ? e.target.value : 0);
    setValueOn(true);
  }

  const updateDropDown = (dropDownValue) => {
    setColumn(dropDownValue);
    setColumnOn(true);
  }

  const updateCondition = (conditionValue) => {
    setComparisson(conditionValue);
    setComparissonOn(true);
  }

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
    planetAction,
    filterCondition,
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
    allFilters,
    cellTable,
    arrDrop,
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
