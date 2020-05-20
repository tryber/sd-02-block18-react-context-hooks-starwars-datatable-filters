import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';
import GenerateColumns from './GenerateColumns';
import GenerateComparison from './GenerateComparison';

const Dropdowns = () => {
  const {
    columnOptions,
    createFilter,
  } = useContext(SWContext);

  return (
    <div>
      {columnOptions.length !== 0
        ? (
          [<GenerateColumns />,
            <GenerateComparison />,
            <button
              type="button"
              onClick={() => createFilter()}
            >
              Filter!
            </button>,
          ])
        : <div>No more filters available!</div>}
    </div>

  );
};
export default Dropdowns;
