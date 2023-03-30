const mongoose = require("mongoose");
const Schema = mongoose.Schema;





//Main Card would probably be list/:id
const CardSchema = new Schema({
  title: String,
  label: [LabelSchema],
  description: String,
  comment: [CommentSchema],
});

const CardModel = mongoose.model("Card", CardSchema)
module.exports = {
  CardModel,
  CardSchema: CardSchema
}