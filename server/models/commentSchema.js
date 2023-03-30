const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/userSchema");

//Comments
const CommentSchema = new Schema({
  comment: String,
  user: [{type: UserSchema}]
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = {
  CommentModel,
  CommentSchema: CommentSchema
};