import React, { useContext } from 'react';
import { Context } from './context/Provider';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumericValuesFilters from './components/NumericValuesFilters';
import SortingSelection from './components/SortingSelection';
import './App.css';

export default function App() {
  const { isLoading } = useContext(Context);

  return (
    <div className="App">
      <h1>StarWars Datatable with Filters</h1>
      {isLoading && 'Loading...'}
      {!isLoading && <SortingSelection />}
      {!isLoading && <NameFilter />}
      {!isLoading && <NumericValuesFilters />}
      <Table />
    </div>
  );
}
