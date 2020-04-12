import React from 'react';
import './App.css';
import { StarWarsContext, StarWarsProvider } from './context/StarWarsContext';
import Table from './functionalComponents/Table';

const App = () => {
  return (
    <StarWarsProvider>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
