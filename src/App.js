import React from 'react';
import Provider from './context/Provider';
import Panel from './components/Panel';

function App() {
  return (
    <Provider>
      <Panel />
    </Provider>
  );
}

export default App;
