const autoprefixer = require('autoprefixer');
const lost = require('lost');
const path = require('path');
const postcssHexrgba = require('postcss-hexrgba');
const postcssNested = require('postcss-nested');
const postcssSimpleVars = require('postcss-simple-vars');
const webpack = require('webpack');

const APP_DIR = path.join(__dirname, '../src');

module.exports = {
  module: {
     loaders: [{
      include: APP_DIR,
      loaders: ['awesome-typescript'],
      test: /\.tsx?$/,
    }, {
      include: APP_DIR,
      loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[path]_[local]_[hash:base64:5]', 'postcss'],
      test: /\.css$/,
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          postcssNested(),
          postcssSimpleVars(),
          postcssHexrgba(),
          lost(),
          autoprefixer(),
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      app: APP_DIR,
    },
    extensions: ['', '.js', '.ts', '.tsx'],
  },
  watchOptions: { poll: 2000 },
};
