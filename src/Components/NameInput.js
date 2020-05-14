import React, { useContext } from 'react';
import SwContext from '../Context';

const NameInput = () => {
  const { setUserInputName } = useContext(SwContext);
  const setAlphaValue = (inputValue) => (
    inputValue.match(/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
    && setUserInputName(inputValue)
  );
  return (
    <div>
      <input
        type="text"
        data-testid="alpha-input-user-search"
        onChange={(e) => setAlphaValue(e.target.value)}
      />
    </div>
  );
};

export default NameInput;
