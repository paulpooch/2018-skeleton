const fs = require('fs-extra');
const path = require('path');
const dotenv = require('dotenv');
const dbConfig = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), 'ops', 'database', '.env')));
dotenv.config({ silent: true }); // Load process.env with contents of .env file.

const BABEL_RC = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.babelrc'), 'utf-8'));
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const babel = require('babel-register')(BABEL_RC);
const bodyParser = require('body-parser');
const config = require(path.resolve(process.cwd(), 'config'));
const devMiddleware = require('webpack-dev-middleware');
const Express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const helmet = require('helmet');
const http = require('http');
const hotMiddleware = require('webpack-hot-middleware');
const Index = require('./templates/Index').default;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Sequelize = require('sequelize');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

let webpackCompiler = null;

try {
  fs.emptyDirSync(config.DIRECTORIES.DIST);
  webpackCompiler = webpack(webpackConfig);
  webpackCompiler.run((error, stats) => {
    if (error) {
      console.error(error);
      throw error;
    } else {
      console.info(
        stats.toString({
          chunks: false,
          colors: true,
          children: false,
        }),
      );
      runServer();
    }
  });
} catch (error) {
  console.error(error);
  throw error;
}

function runServer() {
  const express = new Express();
  const server = new http.Server(express);
  express.use(helmet());
  if (IS_DEVELOPMENT) {
    express.use(
      devMiddleware(webpackCompiler, {
        noInfo: true,
        publicPath: config.DIRECTORIES.PUBLIC_PATH,
        historyApiFallback: true,
      }),
    );
    express.use(hotMiddleware(webpackCompiler));
  }
  express.use('/dist', Express.static(config.DIRECTORIES.DIST));
  express.get('*', (req, res, next) => {
    const props = {};
    const index = React.createElement(Index, props);
    const html = ReactDOMServer.renderToString(index);
    res.send(`<!doctype html>${html}`);
  });
  express.use('/graphql', bodyParser.json(), (req, res, next) =>
    graphqlExpress({
      schema,
      context: { user: req.user },
    })(req, res, next),
  );
  if (IS_DEVELOPMENT) {
    express.get(
      '/graphiql',
      graphiqlExpress({
        endpointURL: '/graphql',
      }),
    );
  }
  server.listen(process.env.PORT, error => {
    if (error) console.error(error);
    console.info(`SERVER LISTENING ON http://localhost:${process.env.PORT}`);
  });
}

// See ops/database/.env
const sequelize = new Sequelize(dbConfig.POSTGRES_DB, dbConfig.POSTGRES_USER, dbConfig.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
