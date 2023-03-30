const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Comments
const CommentSchema = new Schema({
  comment: String,
  user: String
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = {
  CommentModel,
  CommentSchema: CommentSchema
};