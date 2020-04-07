import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import SavedFilters from './components/SavedFilters';
import { StarWarsProvider } from './context/StarWarsContext';

function App() {
  return (
    <StarWarsProvider>
      <div className="App">
        <div className="mainContainer">
          <Filters />
          <SavedFilters />
          <Table />
        </div>
      </div>
    </StarWarsProvider>
  );
}

export default App;
