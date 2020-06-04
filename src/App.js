import React from 'react';
import { Provider } from './context/StarWarsContext';
import Table from './components/Table';
import Filters from './components/Filters';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="App">
        <Filters />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
