const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/models");

router.post("/login", (req, res) => {
  const {username, password} = req.body;

  User.findone({username})
  .then(user => {
    if (!user) {
      return res.status(404).json({message: "Username Doesn't Exist"});
    }

    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username
        };

        jwt.sign(payload, "trello", {expiresIn: 6000}, (err, token) => {
          res.send({success: true, token: "Bearer" + token});
        });
      } else {
        res.status(400);
      }
    });
  });
});

module.exports = router;
