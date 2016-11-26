const autoprefixer = require('autoprefixer');
const lost = require('lost');
const path = require('path');
const postcssHexrgba = require('postcss-hexrgba');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssSimpleVars = require('postcss-simple-vars');
const webpack = require('@kadira/storybook/node_modules/webpack');

const clientEnv = require('../client-env');

const APP_DIR = path.join(__dirname, '../src');
const ENV_DIR = path.join(__dirname, 'env');

module.exports = {
  module: {
    loaders: [{
      include: APP_DIR,
      loader: 'babel',
      test: /\.jsx?$/,
    }, {
      include: APP_DIR,
      loader: 'style!css?modules&importLoaders=1&localIdentName=[path]_[local]_[hash:base64:5]!postcss',
      test: /^((?!(main)).)*\.css$/,
    }, {
      include: APP_DIR,
      loader: 'style!css!postcss',
      test: /main\.css$/,
    }, {
      loader: 'json',
      test: /\.json$/,
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
      env: JSON.stringify(clientEnv),
    }),
  ],
  postcss: [
    // @note Ordering matters.
    postcssImport({
      path: ['assets/css'],
      root: APP_DIR,
    }),
    postcssNested(),
    postcssSimpleVars(),
    postcssHexrgba(),
    lost(),
    autoprefixer(),
  ],
  resolve: {
    alias: {
      app: APP_DIR,
      config: ENV_DIR,
    },
    extensions: ['', '.js', '.jsx'],
    modules: ['node_modules'],
  },
  watchOptions: { poll: 1000 },
};
