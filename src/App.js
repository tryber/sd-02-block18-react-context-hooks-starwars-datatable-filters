import React from 'react';
import './App.css';
import { StarWarsProvider } from './context/StarWarsContext';
import Table from './functionalComponents/Table';

const App = () => <StarWarsProvider><Table /></StarWarsProvider>;

export default App;
