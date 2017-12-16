const fs = require('fs-extra');
const path = require('path');
const BABEL_RC = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), '.babelrc'), 'utf-8')
);
const babel = require('babel-register')(BABEL_RC);
const config = require(path.resolve(process.cwd(), 'config'));
const Express = require('express');
const http = require('http');
const Index = require('./templates/Index').default;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const express = new Express();
const server = new http.Server(express);

try {
  fs.emptyDirSync(config.DIRECTORIES.DIST);
  const webpackCompiler = webpack(webpackConfig);
  webpackCompiler.run((error, stats) => {
    if (error) {
      console.error(error);
      throw error;
    } else {
      console.info(stats.toString({
        chunks: false,
        colors: true,
        children: false,
      }));
      runServer();
    }
  });
} catch (error) {
  console.error(error);
  throw error;
}

express.use('/dist', Express.static(config.DIRECTORIES.DIST));

express.get('*', (req, res, next) => {
  const props = {};
  const index = React.createElement(Index, props);
  const html = ReactDOMServer.renderToString(index);
  res.send(`<!doctype html>${ html }`);
});

function runServer() {
  server.listen(config.PORT, (error) => {
    if (error) console.error(error);
  });
}
