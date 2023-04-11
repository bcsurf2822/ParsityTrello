const router = require("express").Router();

const { Label, Card, Board, User, List, Comment } = require("../models/models");

// Create Boards
router.post("/boards", async (req, res, next) => {
  try {
    console.log("body", req.body);
    const { title, userId } = req.body;
    const newBoard = new Board({ title, user: userId });
    await newBoard.save();

    const user = await User.findById(userId);
    user.boards.push(newBoard);
    await user.save();

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

// Get board by userId
router.get("/user/:userId/boards", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('boards');
    if (user) {
      res.status(200).send({ boards: user.boards });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error occurred fetching boards for user" });
  }
});

// Update Boards

// Delete Boards
router.delete("/boards/:board", async (req, res, next) => {
  try {
    const boardById = await Board.findByIdAndRemove(req.params.board);
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