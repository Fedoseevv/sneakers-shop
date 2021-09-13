import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'
import ErrorBoundary from './error-boundary';

import './index.css';


ReactDOM.render(
    <ErrorBoundary>
        <Router>
          <App/>
        </Router>
    </ErrorBoundary>
  
  ,document.getElementById('root')
);
