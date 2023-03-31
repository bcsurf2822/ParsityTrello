const router = require("express").Router();
const faker = require('faker');
// const {User} = require("../models/userSchema")
// const {Board} = require("../models/boardSchema")
// const {List} = require("../models/listSchema")
// const {Comment} = require("../models/commentSchema")
// const {Card} = require("../models/cardSchema")
// const {Label} = require("../models/labelSchema")

const {Label, Card, Board, User, List, Comment} = require("../models/models")
const boardTitles = ["Frontend", "Backend", "Project"];
const progress = ["To Do", "Doing", "Done", "RoadBlocks"];

//to generate boards with lists
router.get("/generate-boards", async (req, res, next) => {
  try {
    for (let i = 0; i < 10; i++) {
      let board = new Board();
      board.title = faker.random.arrayElement(boardTitles);

      // Create lists and add them to the board
      for (let j = 0; j < 3; j++) {
        let list = new List();
        list.title = faker.random.arrayElement(progress);

        // Create cards and add them to the list
        for (let k = 0; k < 3; k++) {
          let card = new Card();
          card.title = faker.lorem.sentence();
          card.description = faker.lorem.paragraph();
          
          // Save the card
          await card.save();
  
          // Add the card to the list's cards array
          list.cards.push(card);
        }

        // Save the list
        await list.save();

        // Add the list to the board's lists array
        board.lists.push(list);
      }

      // Save the board with the lists
      await board.save();
    }
    res.status(200).send({ message: "Boards, lists and cards generated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error occurred generating" });
  }
});

//Gets Boards
router.get("/boards", async (req, res, next) => {
  try {
    const boards = await Board.find({}).exec();

    const response = {
      results: boards,
    };

    console.log(response);
    res.json(response);
  } catch (err) {
    console.log(err)
    res.status(500).send({error: "Error Occured fetching data"});
  }
});

//Post Boards
router.post("/boards", async (req, res, next) => {
  try {
    console.log("body", req.body)
    const postedBoard = req.body;
    const newBoard = new Board(postedBoard);
    newBoard.save();
    console.log("New Board", newBoard);
    res.status(201).send(newBoard);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: "error"});
  }
});

//delete board
router.delete("/boards/:board", async (req,res, next) => {
  try {
    const boardById = await Board.findByIdAndRemove(req.params.board);
    console.log(boardById)
    if (!boardById) {
      res.status(404).send({error: "Invalid ID"})
    }
    res.status(200).send({message: "Board Deleted"})
    } catch (err) {
      console.log(err);
      res.status(500).send({error: "Server Error"});
    }
});

//Delete List
router.delete("/boards/:board/lists/:list", async(req, res, next) => {
  try {
    const boardById = await Board.findById(req.params.board);
    
    if (!boardById) {
      res.status(404).send({error: "No Board with that ID"})
    }

    const listIndex = boardById.lists.findIndex(list => list._id.toString() === req.params.list);
    if (listIndex === -1) {
      res.status(404).send({error: "List not found"});
      return;
    }

    boardById.lists.splice(listIndex, 1);
    await boardById.save();
    
    console.log("Board", boardById);
    res.status(200).send({message: "List Deleted"});

  } catch (err) {
    console.log(err);
    res.status(500).send({error: "Server Error"});
  }
});

//Get lists
router.get("/board/:board/lists", async (req, res) => {
  try {
    const board = await Board.findById(req.params.board).populate("lists");
    res.json(board.lists);
  } catch (error) {
    console.error("Error fetching lists data", error);
    res.status(500).json({ message: "Server error" });
  }
});

const usernames = ["Ben", "Joseph", "Nicholas", "John", "Pat", "Will", "Aaron", "Peter"];
const passwords = ["get"];

router.get("/generate-users", (req,res) => {
  for (let i = 0; i < 8; i++) {
    let user = new User();

    user.username = faker.random.arrayElement(usernames);
    user.password = faker.random.arrayElement(passwords);

    const userResult = user.save();
    console.log(userResult);
    res.end();
  }
})


module.exports = router;

