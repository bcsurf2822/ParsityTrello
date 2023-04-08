
const router = require("express").Router();

const { Label, Card, Board, User, List, Comment } = require("../models/models");

router.patch("/board/:boardId/lists/:listId/cards/:cardId/description", async (req, res, next) => {
  try {
    const {boardId, listId, cardId} = req.params;
    const {description} = req.body;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).send({error: "No board With that ID"});
    }

    const list = board.lists.find(data => data._id.toString() === listId);
    if (!list) {
      return res.status(404).send({error: "No List With that ID"});
    }

    const card = list.cards.find(data => data._id.toString() === cardId)
    if (!card) {
      return res.status(404).send({error: "No Card With that ID"});
    }

    card.description = description;
    await board.save();
    res.status(200).send(card);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: "Server Error"})
  }
});

module.exports = router;