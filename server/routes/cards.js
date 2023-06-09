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

    list.cards.push(newCard);

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

    const list = await List.findById(listId).populate("cards");

    if (!list) {
      return res.status(404).send({ error: "List not found" });
    }

    res.status(200).send(list);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "error" });
  }
});

// Update cards
router.patch(
  "/boards/:boardId/lists/:listId/cards/:cardId",
  async (req, res, next) => {
    try {
      const { boardId, listId, cardId } = req.params;
      const updateData = req.body;

      const board = await Board.findById(boardId);

      if (!board) {
        return res.status(404).send({ error: "Board not found" });
      }

      const list = await List.findOne({ _id: listId, "cards._id": cardId });

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

    res
      .status(200)
      .send({message: "Card order updated", cards: list.cards})
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
});

// Delete cards
router.delete(
  "/board/:boardId/lists/:listId/cards/:cardId",
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

// TODO: post description in card
router.post(
  "/lists/:listId/cards/:cardId/description",
  async (req, res, next) => {
    try {
      const { listId, cardId } = req.params;
      const { description } = req.body;

      const list = await List.findOne({ _id: listId, "cards._id": cardId });

      if (!list) {
        return res.status(404).send({ error: "Card not found in the list" });
      }

      const cardIndex = list.cards.findIndex(
        (card) => card._id.toString() === cardId
      );

      if (cardIndex === -1) {
        return res.status(404).send({ error: "Card not found in the list" });
      }

      // Post description to card
      list.cards[cardIndex].description = description.description;

      // Save
      await list.save();

      res.status(201).send({ message: "Description added"});
    } catch (err) {
      res.status(500).send({ error: "Server Error" });
    }
  } 
);

// TODO: post label in card
router.post(
  "/lists/:listId/cards/:cardId/label",
  async (req, res, next) => {
    try {
      const { listId, cardId } = req.params;
      const { label, color } = req.body;

      const list = await List.findOne({ _id: listId, "cards._id": cardId });

      if (!list) {
        return res.status(404).send({ error: "Card not found in the list" });
      }

      const cardIndex = list.cards.findIndex(
        (card) => card._id.toString() === cardId
      );

      if (cardIndex === -1) {
        return res.status(404).send({ error: "Card not found in the list" });
      }

      // Create a new label
      const newLabel = {
        text: label,
        color: color || "bg-gray-200",
      };

      // Add the comment to the card
      list.cards[cardIndex].label.unshift(newLabel);
      await list.save();

      res.status(201).send({ message: "Label added" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Server Error" });
    }
  }
);

// `/lists/${listId}/cards/${cardId}/title`
// TODO: PATCH title in card
router.patch(
  "/lists/:listId/cards/:cardId/title",
  async (req, res, next) => {
    try {
      const { listId, cardId } = req.params;
      const { title } = req.body;

      const list = await List.findOne({ _id: listId, "cards._id": cardId });

      if (!list) {
        return res.status(404).send({ error: "Card not found in the list" });
      }

      const cardIndex = list.cards.findIndex(
        (card) => card._id.toString() === cardId
      );

      if (cardIndex === -1) {
        return res.status(404).send({ error: "Card not found in the list" });
      }

      // Post description to card
      list.cards[cardIndex].title = title;

      // Save
      await list.save();

      res.status(201).send({ message: "Description added"});
    } catch (err) {
      res.status(500).send({ error: "Server Error" });
    }
  } 
)


module.exports = router;