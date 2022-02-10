import { DAppProvider, Config } from '@usedapp/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxStore from './Store/reduxStore';
import App from './Views/App';

const useDappConfig: Config = {
  autoConnect: false,
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={useDappConfig}>
      <App />
    </DAppProvider>

  </React.StrictMode>,
  document.getElementById('root'),
);
