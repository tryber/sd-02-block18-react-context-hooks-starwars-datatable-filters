import React from 'react';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumericFilters from './components/NumericFilters';

function App() {
  return (
    <div className="App" data-testid="main-app">
      <div data-testid="table-container-app">
        <h1>StarWars Datatable with Filters</h1>
        <div>
          <NameFilter />
        </div>
        <div>
          <NumericFilters />
        </div>
        <Table />
      </div>
    </div>
  );
}

export default App;
