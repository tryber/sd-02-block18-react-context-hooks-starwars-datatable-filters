import React, { useContext } from 'react';
import SwContext from './Context';
import './App.css';
import Title from './Components/Title';
import Loading from './Loading';
import Table from './Pages/Table';
import NameInput from './Components/NameInput';

const App = () => {
  const { isFetching } = useContext(SwContext);
  return (
    <div className="App">
      <Title />
      {!isFetching
        ? (
          <div>
            <div>
              <NameInput />
            </div>
            <Table />
          </div>
        ) : <Loading />}
    </div>
  );
};

export default App;
