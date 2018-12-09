import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, Logged, Error } from 'js/pages';

const Layout = props => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/error" component={Error} />
    <Route path="/user/:code" component={Logged} />
  </Switch>
);

export default Layout;
