import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from './Store/store'

ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>,
  document.getElementById('root') as HTMLElement
);
