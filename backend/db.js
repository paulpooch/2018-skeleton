const dotenv = require('dotenv');
const fs = require('fs-extra');
const path = require('path');
const config = require(path.resolve(process.cwd(), 'config'));
const dbConfig = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), 'ops', 'database', '.env')));
const Sequelize = require('sequelize');

const db = {};

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

fs
  .readdirSync(config.DIRECTORIES.MODELS)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(config.DIRECTORIES.MODELS, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
