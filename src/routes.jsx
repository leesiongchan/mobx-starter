import React from 'react';
import { IndexRoute, Route } from 'react-router';

import AboutPage from 'app/pages/AboutPage';
import App from 'app/components/App';
import AppStore from 'app/stores/AppStore';
import HomePage from 'app/pages/HomePage';
import NotFoundPage from 'app/pages/NotFoundPage';

const appStore = new AppStore();

const Wrapper = ({ children }) => React.cloneElement(children, {
  appStore,
});

const routes = (
  <Route component={Wrapper}>
    <Route component={App} path="/">
      <IndexRoute component={HomePage} />

      <Route component={AboutPage} path="about" />

      <Route component={NotFoundPage} path="*" />
    </Route>
  </Route>
);

export default routes;
