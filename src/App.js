import React from 'react';
import Table from './components/Table';
import { SWAPIContext } from './context/SWAPIContext';

function App() {
  return (
    <SWAPIContext>
      <Table />
    </SWAPIContext>
  );
}

export default App;
