/* global ENVIRONMENT */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import config from '../config';

const render = Component => {
  if (ENVIRONMENT === 'production') {
    // No hot loading in production.
    return ReactDOM.render(<Component />, document.getElementById(config.REACT_ROOT_ELEMENT));
  }

  return ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById(config.REACT_ROOT_ELEMENT),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    render(Root);
  });
}
