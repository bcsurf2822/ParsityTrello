const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
// const passport = require("passport");

// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const LocalStrategy = require("passport-local").Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;

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


const passportRoutes = require ("./services/passport");
app.use(passportRoutes)

const mainRoutes = require("./routes/main");
app.use(mainRoutes);

const authorizedRoutes = require("./routes/login");
app.use(authorizedRoutes);


app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});