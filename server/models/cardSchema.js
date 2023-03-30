const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Label = require("../models/labelSchema");
const Comment = require("../models/commentSchema")





//Main Card would probably be list/:id
const CardSchema = new Schema({
  title: String,
  label: [{type: Label.LabelSchema}],
  description: String,
  comment: [{type: Comment. CommentSchema}],
});

const CardModel = mongoose.model("Card", CardSchema);

module.exports = {
  CardModel,
  CardSchema: CardSchema
}