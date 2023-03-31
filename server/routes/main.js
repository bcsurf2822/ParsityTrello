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


//to generate labels
router.get("/generate-boards", async (req, res, next) => {
  for (i=0; i < 10; i++) {
    let board = new Board();

    board.title = faker.random.arrayElement(boardTitles);

    const boardResult = board.save();
    console.log(boardResult);
    res.end();
  }
});

router.get("/boards", async (req, res, next) => {
  try {
    const boards = await Board.find({}).exec();

    const response = {
      results: boards,
    };

    res.json(response);
  } catch (err) {
    console.log(err)
    res.status(500).send({error: "Error Occured fetching data"});
  }
})

//use if you want to test the List View But we will probably just be posting new new cards to populate this area
const progress = ["To Do", "Doing", "Done", "RoadBlocks"];

router.get("/generate-list", (req, res, next) => {
  for (i=0; i < 50; i++) {
    let list = new List();

    list.progress = faker.random.arrayElement(progress);

    const listSave = list.save();
    console.log(listSave);
    res.end();
  }
});

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
router.get("/generate-cards", (req, res, next) => {
  for (let i = 0; i < 40; i++) {
    let card = new Card();

    card.title = faker.lorem.sentence();
    card.description = faker.lorem.paragraph();

    const result = card.save();
    console.log(result);
    res.end();
  }
});

module.exports = router;