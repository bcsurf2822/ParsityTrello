const mongoose = require("mongoose");
const Schema = mongoose.Schema;




//Comments
const CommentSchema = new Schema({
  comment: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = {
  CommentModel,
  CommentSchema: CommentSchema
};