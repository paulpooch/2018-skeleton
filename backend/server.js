const fs = require('fs-extra');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ silent: true }); // Load process.env with contents of .env file.

const BABEL_RC = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.babelrc'), 'utf-8'));
const BUILD_FLAG = '--build';
const IS_PROD_BUILD = process.argv.slice(2)[0] === BUILD_FLAG;
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SESSION_SECRET = 'H6CeOtSpgJXFGun7Uoan';

const authController = require('./controllers/authController');
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
const session = require('express-session');
const webpack = require('webpack');
const webpackConfig = IS_PRODUCTION ? require('../webpack.config.prod') : require('../webpack.config');

// 1. Database /////////////////////////////////////////////////////////////////////////////////////////////////////////
const db = require('./db');

// 2. Webpack build ////////////////////////////////////////////////////////////////////////////////////////////////////
let webpackCompiler = null;

function webpackBuild() {
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
        console.info('Build hash', stats.hash);
        console.info('Build complete.')
        if (!IS_PROD_BUILD) runServer();
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 3. Express server ///////////////////////////////////////////////////////////////////////////////////////////////////
function runServer() {
  const scripts = fs.readdirSync(path.resolve(config.DIRECTORIES.DIST, 'js')).filter(file => file.slice(-3) === '.js');

  const app = new Express();
  const server = new http.Server(app);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(
    session({
      cookie: { path: '/', httpOnly: true, secure: IS_PRODUCTION, maxAge: null },
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  if (IS_DEVELOPMENT) {
    app.use(
      devMiddleware(webpackCompiler, {
        noInfo: true,
        publicPath: config.DIRECTORIES.PUBLIC_PATH,
        historyApiFallback: true,
      }),
    );
    app.use(hotMiddleware(webpackCompiler));
  }
  app.use('/dist', Express.static(config.DIRECTORIES.DIST));

  app.use('/graphql', bodyParser.json(), (req, res, next) =>
    graphqlExpress({
      schema,
      context: { user: req.user },
    })(req, res, next),
  );
  if (IS_DEVELOPMENT) {
    app.get(
      '/graphiql',
      graphiqlExpress({
        endpointURL: '/graphql',
      }),
    );
  }

  app.post('/auth', authController.register);
  app.get('/auth', authController.register);

  app.get('*', (req, res, next) => {
    const props = {
      scripts,
    };
    const index = React.createElement(Index, props);
    const html = ReactDOMServer.renderToString(index);
    res.send(`<!doctype html>${html}`);
  });

  server.listen(process.env.PORT, error => {
    if (error) console.error(error);
    console.info(`SERVER LISTENING ON http://localhost:${process.env.PORT}`);
  });
}

// 4. Run //////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (IS_DEVELOPMENT) webpackBuild();
if (IS_PRODUCTION && IS_PROD_BUILD) webpackBuild();
if (IS_PRODUCTION && !IS_PROD_BUILD) runServer();
