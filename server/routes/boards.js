const router = require("express").Router();

const { Label, Card, Board, User, List, Comment } = require("../models/models");

// Create Boards
router.post("/boards", async (req, res, next) => {
  try {
    console.log("body", req.body);
    const postedBoard = req.body;
    const newBoard = new Board(postedBoard);
    newBoard.save();
    console.log("New Board", newBoard);
    res.status(201).send(newBoard);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "error" });
  }
});

// Read Boards
router.get("/boards", async (req, res, next) => {
  try {
    const boards = await Board.find({}).exec();

    const response = {
      results: boards,
    };

    //console.log(response);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error Occured fetching data" });
  }
});

// Update Boards

// Delete Boards
router.delete("/boards/:board", async (req, res, next) => {
  try {
    const boardById = await Board.findByIdAndRemove(req.params.board);
    console.log(boardById);
    if (!boardById) {
      res.status(404).send({ error: "Invalid ID" });
    }
    res.status(200).send({ message: "Board Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
});

module.exports = router;