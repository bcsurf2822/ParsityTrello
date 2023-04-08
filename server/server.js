const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

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

const boardRoutes = require("./routes/boards");
app.use(boardRoutes);

const cardRoutes = require("./routes/cards");
app.use(cardRoutes);

const commentRoutes = require("./routes/comments");
app.use(commentRoutes);

const descriptionRoutes = require("./routes/descriptions");
app.use(descriptionRoutes);

const listRoutes = require("./routes/lists")
app.use(listRoutes);

const passportRoutes = require("./services/passport");
app.use(passportRoutes);

const mainRoutes = require("./routes/main");
app.use(mainRoutes);

const authorizedRoutes = require("./routes/login");
app.use(authorizedRoutes);

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});
