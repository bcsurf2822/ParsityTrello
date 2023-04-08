
const router = require("express").Router();

const { Label, Card, Board, User, List, Comment } = require("../models/models");

// router.patch("/board/:boardId/lists/:listId/cards/:cardId/description", async (req, res, next) => {
//   try {
//     const {boardId, listId, cardId} = req.params;
//     const {description} = req.body;
//     const board = await Board.findById(boardId);
//     if (!board) {
//       return res.status(404).send({error: "No board With that ID"});
//     }

//     const list = board.lists.find(data => data._id.toString() === listId);
//     if (!list) {
//       return res.status(404).send({error: "No List With that ID"});
//     }

//     const card = list.cards.find(data => data._id.toString() === cardId)
//     if (!card) {
//       return res.status(404).send({error: "No Card With that ID"});
//     }

//     card.description = description;
//     await board.save();
//     res.status(200).send(card);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({error: "Server Error"})
//   }
// });

// router.post("/board/:boardId/lists/:listId", async (req, res, next) => {
//   try {
//     const { boardId, listId } = req.params;
//     const boardById = await Board.findById(boardId);

//     if (!boardById) {
//       return res.status(404).send({ error: "Board not found" });
//     }

//     const listInBoard = boardById.lists.find(

//       (list) => list._id.toString() === listId
//     );

//     if (!listInBoard) {
//       return res.status(404).send({ error: "List not found in the board" });
//     }

//     const list = await List.findById(listId);

//     if (!list) {
//       return res.status(404).send({ error: "List not found" });
//     }

//     const postedCard = req.body;
//     const newCard = new Card(postedCard);
//     await newCard.save();

//     list.cards.push(newCard);

//     await list.save();
//     res.status(201).send(newCard);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ error: "error" });
//   }
// });

module.exports = router;