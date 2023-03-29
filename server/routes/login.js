const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/models");

const findUser = async (username) => {
  try {
    const user = await User.findone ({username});
    return user;
  } catch (error) {
    console.log("Cant find User");
    return null;
  }
}

router.post("/login",  async (req, res, done) => {
  const {username, password} = req.body;

  try {
    const user = await User.findOne({username});

    if (!user) {
      return done(null, false)
    }

    const checkPassword = password === user.password;

    if (!checkPassword) {
      return done (null, false, {message: "Incorrect Password"})
    }
  }
});

module.exports = router;
