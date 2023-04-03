const router = require("express").Router();
const jwt = require("jwt-simple");
const passport = require("passport");
const faker = require("faker")
const {User} = require("../models/models")

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

const requireAuth = passport.authenticate('jwt', {session: false});

router.get("/authorized", requireAuth, function (req, res, next) {
  const token = userToken(req.user);
  console.log("NewJWT", token)
  const authUser = {
    username: req.user.username,
    token: token,
};
console.log(authUser);
res.send(authUser);
});

const usernames = ["team", "myTrello", "mySite"];
const passwords = ["trello2"];

router.get("/generate-users", (req,res) => {
  for (let i = 0; i < 3; i++) {
    let user = new User();

    user.username = faker.random.arrayElement(usernames);
    user.password = faker.random.arrayElement(passwords);


    const userResult = user.save();
    console.log(userResult);
    res.end();
  }
});



module.exports = router;