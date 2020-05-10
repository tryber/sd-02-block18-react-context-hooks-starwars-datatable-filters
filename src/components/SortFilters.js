import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const SortFilters = () => {
  const {
    data,
    setData,
    sFilters,
    setSFilters,
  } = useContext(SWContext);

  const sortColumn = (e) => {
    setSFilters([{
      ...sFilters[0],
      column: e.target.value,
    }]);
  };

  const sortOrder = (e) => {
    setSFilters([{
      ...sFilters[0],
      order: e.target.value,
    }]);
  };

  const sortStrings = () => {
    const { column, order } = sFilters[0];
    if (order === 'ASC') {
      setData(data.sort((a, b) => (a[column] < b[column] ? 1 : -1)));
    }
    if ((order === 'DESC')) {
      setData(data.sort((a, b) => (a[column] > b[column] ? 1 : -1)));
    }
  };

  const sortNumbers = () => {
    const { column, order } = sFilters[0];
    if (order === 'ASC') {
      setData(data.sort((a, b) => (parseInt(a[column], 10) < parseInt(b[column], 10) ? 1 : -1)));
    }
    if ((order === 'DESC')) {
      setData(data.sort((a, b) => (parseInt(a[column], 10) > parseInt(b[column], 10) ? 1 : -1)));
    }
  };

  const changeOrderandState = (e) => {
    const { column, order } = sFilters[0];
    const arrayStrings = ['name', 'climate', 'gravity', 'terrain', 'films', 'url'];
    if (arrayStrings.some((param) => param === column)) {
      sortStrings(data, column, order);
    } else {
      sortNumbers(data, column, order);
    }
    sortOrder(e);
    return data;
  };

  return (
    <div>
      <select onClick={(e) => sortColumn(e)}>
        {Object.keys(data[0])
          .map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
      <button type="button" value={sFilters[0].order === 'ASC' ? 'DESC' : 'ASC'} onClick={(e) => changeOrderandState(e)}>{sFilters[0].order === 'ASC' ? 'Descending' : 'Ascending'}</button>
    </div>
  );
};

export default SortFilters;
