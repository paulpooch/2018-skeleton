const db = require('../db');

function register(req, res) {
  db.User.create({
    email: 'test@test.com',
    password: 'test',
  }).then((user) => {
    res.send(user);
  }).catch((error) => {
    res.status(500).send(error);
  });
}

module.exports = {
  register,
};
