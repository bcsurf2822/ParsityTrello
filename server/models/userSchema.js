const mongoose = require("mongoose");
const Board = require("../models/boardSchema");
const Schema = mongoose.Schema;
const Comment = require("../models/commentSchema");



const UserSchema = new Schema({
  username: String,
  password: String,
  board: [{type: Board.BoardSchema}],
  comments: [{type: Comment.CommentSchema}]
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = {
  UserModel,
  UserSchema: UserSchema
};
