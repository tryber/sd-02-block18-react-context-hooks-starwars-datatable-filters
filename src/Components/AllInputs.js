import React from 'react';
import NameInput from './NameInput';
import ColumnSelect from './ColumnSelect';
import ComparisonSelect from './ComparisonSelect';
import NumberInput from './NumberInput';

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
  </div>
);

export default AllInputs;
