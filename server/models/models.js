const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//This is the schema when you first enter the page on ours its Backend Agile, Front end and design
const BoardsSchema = new Schema({
  title: String,
  lastUsed: Date,
});

//This Is the List view of the cards
const ListSchema = new Schema({
  progress: String,
  card: {
    type: Schema.Types.ObjectId,
    ref: "Card"
  }
});

//Comments
const CommentSchema = new Schema({
  comment: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const LabelSchema = new Schema({
  text: String,
  color: String,
});

//Main Card would probably be list/:id
const CardSchema = new Schema({
  title: String,
  label: [LabelSchema],
  description: String,
  comment: [CommentSchema],
});

//This is for the user information
const UserSchema = new Schema({
  username: String,
  password: String,
  board: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});


module.exports = {
  User: mongoose.model("User", UserSchema),
  Board: mongoose.model("Board", BoardsSchema),
  List: mongoose.model("List", ListSchema),
  Comment: mongoose.model("Comment", CommentSchema),
  Card: mongoose.model("Card", CardSchema),
  Label: mongoose.model("Label", LabelSchema),
};