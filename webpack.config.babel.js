import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import lost from 'lost';
import path from 'path';
import postcssHexrgba from 'postcss-hexrgba';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssSimpleVars from 'postcss-simple-vars';
import webpack from 'webpack';

const APP_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';

let webpackConfig = {
  context: APP_DIR,
  entry: [
    './assets/css/main.css',
    './index.jsx',
  ],
  externals: {
    config: 'env',
  },
  module: {
    loaders: [{
      include: APP_DIR,
      loader: ExtractTextPlugin.extract({ loader: 'css?modules&importLoaders=1!postcss', fallbackLoader: 'style' }),
      test: /^((?!(main)).)*\.css$/,
    }, {
      include: APP_DIR,
      loader: ExtractTextPlugin.extract({ loader: 'css!postcss', fallbackLoader: 'style' }),
      test: /main\.css$/,
    }, {
      include: APP_DIR,
      loader: 'babel',
      test: /\.jsx?$/,
    }, {
      loader: 'json',
      test: /\.json$/,
    }],
  },
  output: {
    filename: '[name]-[hash].js',
    path: DIST_DIR,
    publicPath: '/',
  },
  plugins: [
    new AssetsPlugin({
      update: true,
    }),
    new webpack.ProgressPlugin(),
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
    },
    extensions: ['', '.js', '.jsx'],
    modules: ['node_modules'],
  },
};

// ---------------------------------------
// Environment-specific Configuration
// ---------------------------------------
if (isProd) {
  webpackConfig = {
    ...webpackConfig,
    devtool: 'hidden-source-map',
    plugins: [
      ...webpackConfig.plugins,
      new ExtractTextPlugin({
        allChunks: true,
        filename: '[name]-[contenthash].css',
      }),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          dead_code: true,
          unused: true,
          warnings: false,
        },
        output: {
          comments: false,
        },
        sourceMap: true,
      }),
    ],
  };
} else {
  const [,, ...loaders] = webpackConfig.module.loaders; // Omit the first two element (CSS loaders).

  webpackConfig = {
    ...webpackConfig,
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      ...webpackConfig.entry,
    ],
    module: {
      loaders: [
        ...loaders,
        {
          include: APP_DIR,
          loader: 'style!css?modules&importLoaders=1&localIdentName=[path]_[local]_[hash:base64:5]!postcss',
          test: /^((?!(main)).)*\.css$/,
        },
        {
          include: APP_DIR,
          loader: 'style!css!postcss',
          test: /main\.css$/,
        },
      ],
    },
    output: {
      ...webpackConfig.output,
      filename: '[name].js',
    },
    plugins: [
      ...webpackConfig.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
  };
}

export default webpackConfig;
