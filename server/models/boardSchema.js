const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const List = require("../models/listSchema")



const BoardSchema = new Schema({
  title: String,
  list: [{ type: List.ListSchema }]
});

const BoardModel = mongoose.model("Board", BoardSchema);

module.exports = BoardModel