const router = require("express").Router();
const passport = require("passport");

const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { User } = require("../models/models");

router.use(passport.initialize());

//Authorization
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "trello",
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async function (payload, done) {
    try {
      const user = await User.findById(payload.sub);
      if (user) {
        return done(null, { user: user.username, _id: user._id });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  })
);

//passport use local strategy with hardcoded username and password
passport.use(
  "login",
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username, password });
      if (user.username === username && user.password === password) {
        return done(null, { user: user.username , _id: user._id });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = router;
