import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Register from './auth/Register';

const css = require('./App.pcss');

const App = () => (
  <div>
    <Link to="/register">Register</Link>
    <Switch>
      {/* Using an HOC will break hot reloading. */}
      <Route exact path="/register" component={Register} />
    </Switch>
  </div>
);

export default App;
