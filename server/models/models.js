const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//This is the schema when you first enter the page on ours its Backend Agile, Front end and design
const CommentSchema = new Schema({
  comment: String,
});

const LabelSchema = new Schema({
  text: String,
  color: String,
});

const CardSchema = new Schema({
  title: String,
  label: [LabelSchema],
  description: String,
  comment: [CommentSchema],
});

//This Is the List view of the cards
const ListSchema = new Schema({
  title: String,
  cards: [CardSchema],
});

const BoardsSchema = new Schema({
  title: String,
  lists: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "List" },
      title: String,
    },
  ],
});

//This is for the user information
const UserSchema = new Schema({
  username: String,
  password: String,
  comments: [CommentSchema]
});


module.exports = {
  User: mongoose.model("User", UserSchema),
  Board: mongoose.model("Board", BoardsSchema),
  List: mongoose.model("List", ListSchema),
  Comment: mongoose.model("Comment", CommentSchema),
  Card: mongoose.model("Card", CardSchema),
  Label: mongoose.model("Label", LabelSchema),
};