const config = require('./config');
const fs = require('fs-extra');
const path = require('path');
const BABEL_RC = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), '.babelrc'), 'utf-8')
);

module.exports = {
  cache: true,
  context: path.resolve(process.cwd(), 'frontend'),
  devtool: 'source-map',
  entry: {
    entry: [
      'react-hot-loader/patch',
      path.resolve(process.cwd(), 'frontend', 'entry'),
    ],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: [
        path.resolve(process.cwd(), 'frontend'),
      ],
      loader: 'babel-loader',
      query: Object.assign({}, BABEL_RC, { cacheDirectory: true }),
    }],
  },
  output: {
    filename: 'js/[name].js',
    path: config.DIRECTORIES.DIST,
    publicPath: '/',
  },
};
