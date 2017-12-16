import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import config from '../config';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById(config.REACT_ROOT_ELEMENT),
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}
