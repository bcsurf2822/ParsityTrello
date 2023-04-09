const router = require("express").Router();

const { Label, Card, Board, User, List, Comment } = require("../models/models");

// Create Card
router.post("/board/:boardId/lists/:listId", async (req, res, next) => {
  try {
    const { boardId, listId } = req.params;
    const boardById = await Board.findById(boardId);

    if (!boardById) {
      return res.status(404).send({ error: "Board not found" });
    }

    const listInBoard = boardById.lists.find(
      (list) => list._id.toString() === listId
    );

    if (!listInBoard) {
      return res.status(404).send({ error: "List not found in the board" });
    }

    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).send({ error: "List not found" });
    }

    const postedCard = req.body;
    const newCard = new Card(postedCard);
    await newCard.save();

    list.cards.push({
      _id: newCard._id,
      title: newCard.title,
    });

    await list.save();
    res.status(201).send(newCard);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "error" });
  }
});

// Read Cards
router.get("/board/:boardId/lists/:listId", async (req, res) => {
  try {
    const { boardId, listId } = req.params;
    const board = await Board.findById(boardId);
    console.log("Fetching cards for listId:", listId);

    if (!board) {
      return res.status(404).send({ error: "Board not found" });
    }
    console.log("Received boardId:", boardId);
    const listInBoard = board.lists.find(
      (list) => list._id.toString() === listId
    );

    if (!listInBoard) {
      return res.status(404).send({ error: "List not found in the board" });
    }

    //This is what I changed  just commented this out Ben-4/8
    // const list = await List.findById(listId).populate("cards");

    // if (!list) {
    //   return res.status(404).send({ error: "List not found" });
    // }

    res.status(200).send({ cards: listInBoard.cards });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "error" });
  }
});

// Update cards
router.patch(
  "/board/:boardId/lists/:listId/cards/:cardId",
  async (req, res, next) => {
    try {
      const { boardId, listId, cardId } = req.params;
      const updateData = req.body;

      const board = await Board.findById(boardId);

      if (!board) {
        return res.status(404).send({ error: "Board not found" });
      }
      //OLD BEFORE NEST FIX
      // const list = await List.findOne({ _id: listId, "cards._id": cardId });
      const list = await List.findById(listId);

      if (!list) {
        return res.status(404).send({ error: "Card not found in the list" });
      }

      const cardIndex = list.cards.findIndex(
        (card) => card._id.toString() === cardId
      );

      if (cardIndex === -1) {
        return res.status(404).send({ error: "Card not found in the list" });
      }

      Object.assign(list.cards[cardIndex], updateData);

      await list.save();
      res
        .status(200)
        .send({ message: "Card updated", card: list.cards[cardIndex] });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Server Error" });
    }
  }
);

// Update card order in ListSchema
router.patch("/lists/:listId/cards", async (req, res, next) => {
  try {
    const { listId } = req.params;
    const updateData = req.body.cards;

    // find list
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).send({ error: "List not found" });
    }

    Object.assign(list.cards, updateData);

    await list.save();

    res.status(200).send({ message: "Card order updated", cards: list.cards });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
});

// Delete cards
router.delete(
  "/boards/:boardId/lists/:listId/cards/:cardId/delete",
  async (req, res, next) => {
    try {
      const { boardId, listId, cardId } = req.params;
      const board = await Board.findById(boardId);

      if (!board) {
        return res.status(404).send({ error: "Invalid Board ID" });
      }

      const listInBoard = board.lists.find(
        (list) => list._id.toString() === listId
      );

      if (!listInBoard) {
        return res.status(404).send({ error: "List not found in the board" });
      }

      const list = await List.findById(listId);

      if (!list) {
        return res.status(404).send({ error: "List not found" });
      }

      const cardIndex = list.cards.findIndex(
        (card) => card._id.toString() === cardId
      );

      if (cardIndex === -1) {
        return res.status(404).send({ error: "Card not found in the list" });
      }

      list.cards.splice(cardIndex, 1);

      await list.save();

      res.status(200).send({ message: "Card Deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Server Error" });
    }
  }
);

//Post Description
router.patch("/board/:boardId/lists/:listId/cards/:cardId/description",
  async (req, res, next) => {
    try {
      const { boardId, listId, cardId } = req.params;
      const { description } = req.body;

      const board = await Board.findById(boardId);

      if (!boardById) {
        return res.status(404).send({ error: "Board not found" });
      }

      const list = board.lists.find((list) => list._id.toString() === listId);
      if (!list)
        return res.status(404).send({ error: "List not found in the board" });

      const card = list.cards.find((card) => card._id.toString() === cardId);
      if (!card)
        return res.status(404).send({ error: "Card not found in the list" });

      card.description = description;
      await board.save();
      res.status(200).send(card);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "error" });
    }
  }
);

module.exports = router;
