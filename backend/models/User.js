const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => v4(),
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = cryptPassword(user.password);
        },
      },
    },
  );

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

function cryptPassword(password) {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}
