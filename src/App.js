import React from 'react';
import Table from './components/Table';
import { SWProvider } from './context/starWarsContext';

function App() {
  return (
    <SWProvider>
      <div className="App">
        <h1>Star War Table: a Context/Hooks Saga!</h1>
        <Table />
      </div>
    </SWProvider>
  );
}

export default App;
