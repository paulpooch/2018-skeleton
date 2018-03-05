const db = require('../db');

async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    const existingUser = await db.User.findOne({
      where: {
        email,
      },
    });
    console.log({ existingUser });
    if (existingUser) {
      throw new Error('Email is already registered.');
    }

    const user = await db.User.create({
      email,
      password,
    });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = {
  register,
};
