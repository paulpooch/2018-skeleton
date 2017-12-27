/* global ENVIRONMENT */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import config from '../config';
import { applyMiddleware, createStore } from 'redux';
import { Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { rootEpic, rootReducer } from './rootActions';
import { createEpicMiddleware } from 'redux-observable';

const history = createBrowserHistory();
const initialState = {};

const preloadedState = initialState;
const store = createStore(rootReducer, preloadedState, enhancer);

const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = [epicMiddleware];
const enhancer = applyMiddleware(...middleware);

const render = Component => {
  if (ENVIRONMENT === 'production') {
    // No hot loading in production.
    return ReactDOM.render(<Component />, document.getElementById(config.REACT_ROOT_ELEMENT));
  }

  return ReactDOM.render(
    <AppContainer>
      <Component history={history} store={store} />
    </AppContainer>,
    document.getElementById(config.REACT_ROOT_ELEMENT),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const UpdatedRoot = require('./Root').default;
    render(UpdatedRoot);
  });
}
