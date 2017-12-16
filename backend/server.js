const Express = require('express');
const fs = require('fs-extra');
const http = require('http');
const path = require('path');

const BABEL_RC = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), '.babelrc'), 'utf-8')
);

const babel = require('babel-register')(BABEL_RC);
const Index = require('./templates/Index');

const express = new Express();
const server = new http.Server(express);

express.get('*', (req, res, next) => {
  const props = {};
  const index = React.createElement(Index, props);
  const html = ReactDOMServer.renderToString(index);
  res.send(`<!doctype html>${ html }`);
});
