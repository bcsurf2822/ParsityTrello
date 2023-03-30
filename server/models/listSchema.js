const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Card = require("../models/cardSchema");


const ListSchema = new Schema({
  title: String,
  card: [{type: Card.CardSchema}],
})

const ListModel = mongoose.model("List", ListSchema);
module.exports = {
  ListModel,
  ListSchema: ListSchema
};