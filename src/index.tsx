import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { browserHistory } from "react-router";

import Router from "app/utils/react-router-fix";
import routes from "./routes";

const appEl = document.getElementById("app");

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory} routes={routes} />
  </AppContainer>,
  appEl
);

if (module.hot) {
  module.hot.accept("./routes", () => {
    const nextRoutes = (require("./routes") as any).default;

    ReactDOM.render(
      <AppContainer>
        <Router history={browserHistory} routes={nextRoutes} />
      </AppContainer>,
      appEl
    );
  });
}
