import * as React from "react";
import { IndexRoute, Route } from "react-router";

import App from "app/App";
import AboutPage from "app/pages/AboutPage";
import HomePage from "app/pages/HomePage";
import NotFoundPage from "app/pages/NotFoundPage";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />

    <Route path="about" component={AboutPage} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
