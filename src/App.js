import React from 'react';
import Table from './components/table';
import Title from './components/title';
import Filters from './components/filters';
import Provider from './context/StarWarsProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <Title />
        <Filters />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
