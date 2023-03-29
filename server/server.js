const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
const passport = require("passport");


require("./services/passport")(passport);

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

//Main Get Routes
const mainRoutes = require("./routes/main");
app.use(mainRoutes);

//Authroized routes with login
const authorizedRoutes = require("./routes/login");
app.use(authorizedRoutes);

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});