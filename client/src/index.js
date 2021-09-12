import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux';
import ErrorBoundary from './error-boundary';
import SneakersService from './services/sneakers-service';
import SneakersServiceContext from './sneakers-service-context';
import store from './store'
import {ItemPage} from './pages'

import './index.css';

const sneakersService = new SneakersService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <SneakersServiceContext.Provider value={sneakersService}>
        <Router>
          <App/>
        </Router>
      </SneakersServiceContext.Provider>
    </ErrorBoundary>
  </Provider>
  
  ,document.getElementById('root')
);
