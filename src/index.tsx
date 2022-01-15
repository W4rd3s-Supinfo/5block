import { DAppProvider } from '@usedapp/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxStore from './Store/reduxStore';
import App from './Views/App';

const useDappConfig = {

};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <DAppProvider config={useDappConfig}>
        <App />
      </DAppProvider>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root'),
);
