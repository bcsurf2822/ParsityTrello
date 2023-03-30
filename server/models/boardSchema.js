const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const List = require("../models/listSchema")



const boardSchema = new Schema({
  title: String,
  // list: [{ type: List}]
});

const BoardModel = mongoose.model("Board", boardSchema);

module.exports = {
  BoardModel,
  BoardSchema: boardSchema
};