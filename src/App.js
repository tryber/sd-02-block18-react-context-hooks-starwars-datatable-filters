import React from 'react';
import Table from './components/Table';
import SWAPI from './services/SWAPI';

function App() {
  return (
    <div className="App">
      <SWAPI />
      <Table />
    </div>
  );
}

export default App;
