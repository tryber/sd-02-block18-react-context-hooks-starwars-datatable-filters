import React from 'react';
import Table from './components/table';
import Title from './components/title';
import FiltersComponent from './components/filtersComponent';
import ListFilters from './components/listFilters';
import Inputs from './components/inputs';
import Provider from './context/StarWarsProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <Title />
        <Inputs />
        <FiltersComponent />
        <ListFilters />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
