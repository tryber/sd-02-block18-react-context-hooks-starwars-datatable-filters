import React from 'react';
import ReactDOM from 'react-dom';
import { ProviderContext } from './context/Provider';
import App from './App';
import './index.css';

ReactDOM.render(
  <ProviderContext>
    <App />
  </ProviderContext>,
  document.getElementById('root'),
);
