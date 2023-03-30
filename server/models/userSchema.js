const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("../models/commentSchema");
const Board = require("../models/boardSchema");


const UserSchema = new Schema({
  username: String,
  password: String,
  comments: [{type: Comment.CommentSchema}],
  board: [{type: Board.BoardSchema}]
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = {
  UserModel,
  UserSchema: UserSchema
};
