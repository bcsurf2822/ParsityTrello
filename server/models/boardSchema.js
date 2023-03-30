const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const List = require("../models/listSchema")



const BoardsSchema = new Schema({
  title: String,
  list: [{ type: List.ListSchema }]
});

const BoardModel = mongoose.model("Board", BoardsSchema);
module.exports = {
  BoardModel,
  BoardsSchema: BoardsSchema
};