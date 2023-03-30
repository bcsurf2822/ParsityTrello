// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;



// const UserSchema = new Schema({
//   username: String,
//   password: String,
//   board: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Board"
//     }
//   ],
//   comments: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Comment"
//     }
//   ]
// });


// module.exports = {
//   User: mongoose.model("User", UserSchema),
//   Board: mongoose.model("Board", BoardsSchema),
//   List: mongoose.model("List", ListSchema),
//   Comment: mongoose.model("Comment", CommentSchema),
//   Card: mongoose.model("Card", CardSchema),
//   Label: mongoose.model("Label", LabelSchema),
// };