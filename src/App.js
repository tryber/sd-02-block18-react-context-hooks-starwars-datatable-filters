import React from 'react';
import Table from './components/Table';

function App() {
  return (
    <div className="App" data-testid="main-app">
      <div data-testid="table-container-app">
        <Table />
      </div>
    </div>
  );
}

export default App;
