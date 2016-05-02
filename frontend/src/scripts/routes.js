'use strict';

import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import { createHistory } from 'history';
import createHashHistory     from "history/lib/createHashHistory";

// Import all of our custom reducers from reducers/index.js
import reducer from 'reducers';
const store = createStore(reducer);
const history = createHistory();

syncReduxAndRouter(history, store, (state) => state.router);

import App from './app.js';
import {
  Dashboard,
  NotFound,
  Login
} from 'components/scenes';

export const Routes = (
  <Provider store={ store }>
    <Router history={ history }>
    <Redirect from="/" to="/home" />
      <Route path='/' component={ App }> //application entry point
         <Route path="home" component={ Dashboard } />
         <Route path="login" component={ Login } />
         <Route path='*' component={ NotFound } />
      </Route>
    </Router>
  </Provider>
);
