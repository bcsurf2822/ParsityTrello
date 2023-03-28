const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//This is the schema when you first enter the page on ours its Backend Agile, Front end and design
const BoardsSchema = new Schema({
  title: String,
  lastUsed: Date,
});

//This Is the List view of the cards
const ListSchema = new Schema({
  category: String,
  title: String
});

//Comments
const CommentSchema = new Schema({
  name: String,
  comment: String,
});

const LabelSchema = new Schema({
  text: String,
  color: String,
});

//Main Card would probably be list/:id
const CardSchema = new Schema({
  title: String,
  label: {LabelSchema},
  description: String,
  comment: [CommentSchema],
});

//This is for the user information
const UserSchema = new Schema({
  username: String,
  password: String,
  comments: [CommentSchema],
});


module.exports = {
  User: mongoose.model("User", UserSchema),
  Board: mongoose.model("Board", BoardsSchema),
  List: mongoose.model("List", ListSchema),
  Comment: mongoose.model("Comment", CommentSchema),
  Card: mongoose.model("Card", CardSchema),
};