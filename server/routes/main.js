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
})


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
})


// router.get("/generate-list", (req, res, next) => {
//   for (i=0; i < 50; i++) {
//     let list = new List();

//     list.progress = faker.random.arrayElement(progress);

//     const listSave = list.save();
//     console.log(listSave);
//     res.end();
//   }
// });

//to generate Users
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

//to generate fake data
// router.get("/generate-cards", (req, res, next) => {
//   for (let i = 0; i < 40; i++) {
//     let card = new Card();

//     card.title = faker.lorem.sentence();
//     card.description = faker.lorem.paragraph();

//     const result = card.save();
//     console.log(result);
//     res.end();
//   }
// });

module.exports = router;

