const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const UserSchema = new Schema({
  username: String,
  password: String,
  board: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = {
  UserModel,
  UserSchema: UserSchema
};
