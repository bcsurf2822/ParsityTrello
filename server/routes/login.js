const router = require("express").Router();
const jwt = require("jwt-simple");
const passport = require("passport");
// const User = require('../models/User');

const userToken = function (user) {
  return jwt.encode({ sub: user.myID,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, "trello");
};

//middleware to ensure correct username and pass
const requireLogin = passport.authenticate("login", {session: false});


router.post("/login", requireLogin, function(req, res, next) {
  const token = userToken(req.user);
  console.log("JWT", token);
  res.send({
    token: token
  })
});

//middleware to see if user has sent JWT with their request before getting response
// const requireAuth = passport.authenticate('jwt', {session: false});

//Go to docs for passport authenticate  How to auth a JWT when using node
//Mig also be get route for HTML
// router.get("/protected", requireAuth, function(req, res) {
//   res.send("JWT Present Access Granted");
// })

module.exports = router;