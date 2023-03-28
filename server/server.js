const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
const passport = require("passport");


const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;


mongoose.connect("mongodb://127.0.0.1/trello2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
//Cors for all endpoints
app.use(cors());
//Body parser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(passport.initialize());

//Authorization
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "trello"
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      console.log("JWT Strategy", payload)
      const user = { myUser: 'user', myID: payload.sub }; 
      // (payload.sub);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
//passport use local strategy with hardcoded username and password
passport.use(
  "login",
  new LocalStrategy(function (username, password, done) {
    const authenticated = username === "trello" && password === "pass";

    if (authenticated) {
      return done(null, {myUser: "user", myId: 1234});
    } else {
      return done(null, false);
    }
  })
);


const mainRoutes = require("./routes/main");
app.use(mainRoutes);

const authorizedRoutes = require("./routes/login");
app.use(authorizedRoutes);

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});