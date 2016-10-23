import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';

import Router from 'app/fixes/react-router-fix';
import routes from 'app/routes';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory} routes={routes} />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes').default;

    ReactDOM.render(
      <AppContainer>
        <Router history={browserHistory} routes={nextRoutes} />
      </AppContainer>,
      rootEl
    );
  });
}
