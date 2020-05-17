import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const SortFilters = () => {
  const {
    sFilters,
    sortData,
    data,
    sortOrder,
    sortColumn,
  } = useContext(SWContext);
  const changeOrderandState = (e) => {
    sortOrder(e);
    sortData();
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
