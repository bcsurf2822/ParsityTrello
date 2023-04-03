const router = require("express").Router();
const passport = require("passport");

const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User= require("../models/userModel");


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
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({username, password})
      console.log("user", user)
      if (user.username === username && user.password === password) {
        return done(null, {myUser: "user", myID: 1234});
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error)
    }
  })
)

    // const user = User.findOne();
    // console.log("user", user);
    // const authenticated = username === user.username && password === "pass";
    // console.log("auth", authenticated)





module.exports = router;