const db = require('../db');

function register(req, res) {
  db.User.create({
    email: 'test@test.com',
    password: 'test',
  });
}

module.exports = {
  register,
};
