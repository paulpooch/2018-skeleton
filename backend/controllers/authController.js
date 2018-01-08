const db = require('../db');

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await db.User.create({
      email,
      password,
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  register,
};
