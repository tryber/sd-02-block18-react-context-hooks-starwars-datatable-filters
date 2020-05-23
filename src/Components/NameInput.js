import React, { useContext } from 'react';
import SwContext from '../Context';

const NameInput = () => {
  const { setUserInputName } = useContext(SwContext);
  return (
    <div>
      <input
        type="text"
        data-testid="alpha-input-user-search"
        onChange={(e) => setUserInputName(e.target.value)}
      />
    </div>
  );
};

export default NameInput;
