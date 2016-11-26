import helmet from 'koa-helmet';
import koa from 'koa';
import logger from 'koa-logger';
import path from 'path';
import staticCache from 'koa-static-cache';
import views from 'koa-views';

import renderer from './middleware/renderer';

const app = koa();

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === 'production';

app.use(logger());
app.use(helmet());
app.use(views(path.join(__dirname, '../templates/views'), {
  extension: 'njk',
  map: {
    njk: 'nunjucks',
  },
}));

if (isProd) {
  app.use(staticCache('public', {
    gzip: true,
    maxAge: isProd ? 365 * 24 * 60 * 60 : 0,
  }));
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('koa-webpack-dev-middleware');
  const webpackHotMiddleware = require('koa-webpack-hot-middleware');
  const config = require('../webpack.config.babel.js').default;
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    stats: {
      children: false,
      chunks: false,
    },
    watchOptions: {
      poll: 1000,
    },
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(renderer('html'));

app.listen(port, host);
