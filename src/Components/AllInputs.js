import React from 'react';
import NameInput from './NameInput';
import ColumnSelect from './ColumnSelect';
import ComparisonSelect from './ComparisonSelect';
import NumberInput from './NumberInput';
import ShowSort from './ShowSorted';
import ShowFilterNumber from './ShowFilterNumber';

const AllInputs = () => (
  <div>
    <div>
      <NameInput />
    </div>
    <div>
      <ColumnSelect />
      <ComparisonSelect />
      <NumberInput />
    </div>
    <div>
      <ShowSort />
      <ShowFilterNumber />
    </div>
  </div>
);

export default AllInputs;
