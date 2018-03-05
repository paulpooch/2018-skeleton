const config = require('./config');
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');

const BABEL_RC = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.babelrc'), 'utf-8'));

module.exports = {
  mode: 'development',
  cache: true,
  context: path.resolve(process.cwd(), 'frontend'),
  devtool: 'source-map',
  entry: {
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(process.cwd(), 'frontend', 'entry'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(process.cwd(), 'frontend')],
        loader: 'babel-loader',
        query: Object.assign({}, BABEL_RC, { cacheDirectory: true }),
      },
      {
        test: /\.s?p?css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              root: '/',
              importLoaders: 1,
              localIdentName: '[path][name]-[local]-[hash:base64:5]',
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'js/[name].js',
    path: config.DIRECTORIES.DIST,
    publicPath: config.DIRECTORIES.PUBLIC_PATH,
  },
  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
