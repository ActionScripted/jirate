/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from 'Constants/routes.json';
import App from 'Containers/App';
import HomePage from 'Containers/HomePage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
