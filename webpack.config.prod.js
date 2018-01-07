const config = require('./config');
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');

const BABEL_RC = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.babelrc'), 'utf-8'));

module.exports = {
  cache: true,
  context: path.resolve(process.cwd(), 'frontend'),
  devtool: false,
  entry: {
    entry: [path.resolve(process.cwd(), 'frontend', 'entry')],
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
    ],
  },
  output: {
    filename: 'js/[name][hash:7].js',
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      mangle: true,
      sourceMap: true,
    }),
  ],
};
