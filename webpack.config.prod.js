const config = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
      {
        test: /\.s?p?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        }),
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
    new ExtractTextPlugin({
      filename: 'css/[name][hash:7].css',
      allChunks: true,
      disable: false,
      ignoreOrder: false,
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
