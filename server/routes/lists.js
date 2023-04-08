const router = require("express").Router();

const { Label, Card, Board, User, List, Comment } = require("../models/models");

// Create Lists
router.post("/board/:boardId/lists", async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const boardById = await Board.findById(boardId);

    if (!boardById) {
      return res.status(404).send({ error: "Board not found" });
    }

    const postedList = req.body;
    const newList = new List(postedList);
    await newList.save();

    boardById.lists.push({
      _id: newList._id,
      title: newList.title,
    });
    console.log("request", req.body);
    console.log("new List", newList);
    console.log("board", boardId);

    await boardById.save();
    res.status(201).send(newList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "error" });
  }
});

// Read Lists
router.get("/board/:board/lists", async (req, res) => {
  try {
    const boardById = await Board.findById(req.params.board).populate("lists");
    res.json(boardById.lists);
  } catch (error) {
    console.error("Error fetching lists data", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update list array in board schema
router.patch("/boards/:boardId/lists", async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const updateData = req.body.lists;

    // find board
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).send({ error: "Board not found" });
    }

    Object.assign(board.lists, updateData);

    await board.save();

    res
      .status(200)
      .send({ message: "List order updated", lists: board.lists });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
});

//Delete Lists
router.delete("/boards/:boardId/lists/:listId", async (req, res, next) => {
  try {
    const { boardId, listId } = req.params;
    console.log("boardId", boardId, "listId", listId)
    const boardById = await Board.findById(boardId);
    console.log("boardBy ID", boardById)
    if (!boardById) {
      res.status(404).send({ error: "Invalid Board ID" });
    }

    const listIndex = boardById.lists.findIndex(
      (list) => list._id.toString() === listId
    );
    console.log("ListIndex", listIndex)

    if (listIndex === -1) {
      return res.status(404).send({ error: "List not found in the board" });
    }

    boardById.lists.splice(listIndex, 1);

    await boardById.save();

    res.status(200).send({ message: "List Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
});

module.exports = router;