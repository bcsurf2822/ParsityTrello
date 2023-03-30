const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const ListSchema = new Schema({
  title: String,
  card: {
    type: Schema.Types.ObjectId,
    ref: "Card"
  }
});

const ListModel = mongoose.model("List", ListSchema);
module.exports = {
  ListModel,
  ListSchema: ListSchema
};