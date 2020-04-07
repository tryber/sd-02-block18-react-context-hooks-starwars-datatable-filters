import React from 'react';

function Inputs() {
  return (
    <div>
      <div>
        Digite a palavra:
        <input
          placeholder="Procurar planeta"
          onChange={() => console.log('trocou')}
        />
      </div>
    </div>
  );
}

export default Inputs;
