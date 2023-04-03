const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")


const UserSchema = new Schema({
  username: String,
  password: String,
});


const User = mongoose.model("User", UserSchema);
module.exports = User;