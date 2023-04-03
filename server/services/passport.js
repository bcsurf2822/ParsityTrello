const router = require("express").Router();
const passport = require("passport");

const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;


router.use(passport.initialize());

//Authorization
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "trello"
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, function (payload, done) {
    return done(null, { myUser: "user", myID: 1234 });
  })
);
//passport use local strategy with hardcoded username and password
passport.use(
  "login",
  new LocalStrategy(function (username, password, done) {
    const authenticated = username === "trello" && password === "pass";

    // const authenticated = username === user.username && password === user.password;
    
    if (authenticated) {
      return done(null, {myUser: "user", myId: 1234});
    } else {
      return done(null, false);
    }
  })
);

module.exports = router;