const db = require('../db');

async function register(req, res, next) {
  try {
    const user = await db.User.create({
      email: 'test@test.com',
      password: 'test',
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  register,
};
