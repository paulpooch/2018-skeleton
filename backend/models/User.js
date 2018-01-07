const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const SCHEMA = {
  id: {
    allowNull: false,
    defaultValue: () => v4(),
    primaryKey: true,
    type: DataTypes.UUID,
    validate: {
      isUUID: 4, // Match the v4 above.
    },
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', SCHEMA, {
    hooks: {
      beforeCreate(user) {
        user.password = cryptPassword(user.password);
      },
    },
  });

  User.checkPassword = async function(name, password) {
    const user = await User.findOne({ where: { name } });
    if (!user) return { user: null, validLogin: false };
    const validLogin = user.checkPassword(password);
    return { user, validLogin };
  };

  User.prototype.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};

module.exports.SCHEMA = SCHEMA;

function cryptPassword(password) {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}
