import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Register from './auth/Register';
import Test from './auth/Test';

const css = require('./App.pcss');

const App = () => (
  <div>
    <Link to="/register">Register</Link>
    <Switch>
      {/* Using an HOC will break hot reloading. */}
      <Route exact path="/register" component={Register} />
      <Route exact path="/test" component={Test} />
    </Switch>
  </div>
);

export default App;
