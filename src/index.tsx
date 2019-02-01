import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import App from './App';
import history from './history';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from './Store/store'

ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
  document.getElementById('root') as HTMLElement
);
