const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const LabelSchema = new Schema({
  text: String,
  color: String,
});

const LabelModel = mongoose.model("Label", LabelSchema);
module.exports = {
  LabelModel,
  LabelSchema: LabelSchema
}