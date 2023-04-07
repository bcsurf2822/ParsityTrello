const router = require("express").Router();

const { Label, Card, Board, User, List, Comment } = require("../models/models");

// Create Comment
router.post(
  "/boards/:boardId/lists/:listId/cards/:cardId/comments",
  async (req, res, next) => {
    try {
      const { boardId, listId, cardId } = req.params;
      const { commentText, userId } = req.body;

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

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      // Create a new comment
      const newComment = {
        comment: commentText,
        user: user._id,
      };

      // Add the comment to the card
      list.cards[cardIndex].comments.push(newComment);
      await list.save();

      // Add the comment reference to the user's comments
      user.comments.push(list.cards[cardIndex].comments.slice(-1)[0]._id);
      await user.save();

      res.status(201).send({ message: "Comment added", comment: newComment });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Server Error" });
    }
  }
);

// Read Comment
router.get("/boards/:boardId/lists/:listId/cards/:cardId/comments", async (req, res, next) => {
  try {
    const { boardId, listId, cardId } = req.params;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).send({ error: "Board not found" });
    }

    const list = await List.findOne({ _id: listId, "cards._id": cardId });

    if (!list) {
      return res.status(404).send({ error: "Card not found in the list" });
    }

    const cardIndex = list.cards.findIndex((card) => card._id.toString() === cardId);

    if (cardIndex === -1) {
      return res.status(404).send({ error: "Card not found in the list" });
    }

    const card = list.cards[cardIndex];
    const comments = card.comments;

    // Populate the user information for each comment
    await Comment.populate(comments, { path: "user", select: "username" });

    res.status(200).send(comments);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
});

// Update Comment

// Delete Comment

module.exports = router;