import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import config from '../config';
import { applyMiddleware, compose, createStore } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { rootEpic, rootReducer } from './rootActions';
import { createEpicMiddleware } from 'redux-observable';

const history = createBrowserHistory();
const initialState = {};

const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = [epicMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middleware));

const preloadedState = initialState;
const store = createStore(rootReducer, preloadedState, enhancers);

const render = Component => {
  if (ENVIRONMENT === 'production') {
    // No hot loading in production.
    return ReactDOM.render(
      <Component history={history} store={store} />,
      document.getElementById(config.REACT_ROOT_ELEMENT),
    );
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
