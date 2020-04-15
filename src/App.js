import React from 'react';
import Table from './components/Table';
import SWContext from './context/starWarsContext';

function App() {
  const contextValue = {
    // inserir contexto dos reducers aqui!
  };

  return (
    <SWContext.Provider value={contextValue}>
      <div className="App">
        <h1>Star War Table: a Context/Redux Saga!</h1>
        <Table />
      </div>
    </SWContext.Provider>
  );
}

export default App;
