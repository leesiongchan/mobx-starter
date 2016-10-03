import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import lost from 'lost';
import path from 'path';
import postcssHexrgba from 'postcss-hexrgba';
import postcssNested from 'postcss-nested';
import postcssSimpleVars from 'postcss-simple-vars';
import webpack from 'webpack';

const APP_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';

let webpackConfig = {
  context: APP_DIR,
  entry: [
    './index.tsx',
  ],
  externals: {
    config: 'env',
  },
  module: {
    loaders: [{
      include: APP_DIR,
      loader: ExtractTextPlugin.extract({ loader: 'css?modules&importLoaders=1!postcss', fallbackLoader: 'style' }),
      test: /\.css$/,
    }, {
      include: APP_DIR,
      loaders: ['awesome-typescript'],
      test: /\.tsx?$/,
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
    new webpack.ProgressPlugin(),
  ],
  resolve: {
    alias: {
      app: APP_DIR,
    },
    extensions: ['*', '.js', '.ts', '.tsx'],
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
  webpackConfig = {
    ...webpackConfig,
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      ...webpackConfig.entry,
    ],
    module: {
      loaders: [{
        include: APP_DIR,
        loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[path]_[local]_[hash:base64:5]', 'postcss'],
        test: /\.css$/,
      }, {
        include: APP_DIR,
        loaders: ['react-hot/webpack', 'awesome-typescript'],
        test: /\.tsx?$/,
      }],
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
