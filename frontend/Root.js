import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';

const history = createBrowserHistory();

const initialState = {};
const middleware = [];

function reducer(state = initialState, action) {
  return state;
}

const preloadedState = initialState;

const enhancer = applyMiddleware(...middleware);

const store = createStore(reducer, preloadedState, enhancer);

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {/* WARNING: This root component cannot be decorated with a HOC (@connect, etc).
       Hot reloading will break. */}
        <Route component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root;