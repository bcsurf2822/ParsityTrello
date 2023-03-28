const router = require("express").Router();
const jwt = require("jwt-simple");
const passport = require("passport");
// const User = require('../models/User');

const userToken = function (user) {
  return jwt.encode({ sub: user.myID,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, 'trello');
};

//middleware to ensure correct username and pass
const requireLogin = passport.authenticate("login", {session: false});

// browser or postman http://localhost:8000/login user: trello pass: pass and you will see token in your console we will get rid of the login html but this was just for test
router.get('/login', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});

router.post("/login", requireLogin, function(req, res, next) {
  const token = userToken(req.user);
  console.log("JWT", token);
  res.send({
    token: token
  })
});

//middleware to see if user has sent JWT with their request before getting response
const requireAuth = passport.authenticate('jwt', {session: false});

router.get("/protected", requireAuth, function(req, res) {
  res.send("JWT Present Access Granted");
})



module.exports = router;
