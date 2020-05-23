import React, { useContext } from 'react';
import StarWarsContext from './context/StarWarsContext';
import InputFilter from './components/InputFilter';
import OrdenadorDeColunas from './components/OrdenadorDeColunas';
import FiltersDropdown from './components/FiltersDropdown';
import ExibeDiv from './components/ExibeDiv';
import Table from './components/Table';
import './App.css';

const App = () => {
  const { swData } = useContext(StarWarsContext);
  if (swData.isLoading) return <div>Loading...</div>;
  if (swData.error) return <div>{swData.error}</div>;
  return (
    <div className="App">
      <header className="App-header">
        <InputFilter />
        <OrdenadorDeColunas />
        <FiltersDropdown />
        <ExibeDiv />
        <Table />
      </header>
    </div>
  );
};

export default App;
