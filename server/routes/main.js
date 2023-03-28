const router = require("express").Router();
const faker = require('faker');
const { User, Board, List, Comment, Card, Label } = require("../models/models");

const boardTitles = ["Frontend", "Backend", "Project"];

const boardDates = ['03-08-2023', '03-04-2023', '2-09-2023']

//to generate labels
router.get("/generate-boards", (req, res, next) => {
  for (i=0; i < 3; i++) {
    let board = new Board();

    board.title = faker.random.arrayElement(boardTitles);
    board.lastUsed = faker.random.arrayElement(boardDates);

    const boardResult = board.save();
    console.log(boardResult);
    res.end();
  }
});

//use if you want to test the List View But we will probably just be posting new new cards to populate this area
const progress = ["To Do", "Doing", "Done", "RoadBlocks"];

router.get("/generate-list", (req, res, next) => {
  for (i=0; i < 4; i++) {
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
  for (let i = 0; i < 20; i++) {
    let card = new Card();

    card.title = faker.lorem.sentence();
    card.description = faker.lorem.paragraph();

    const result = card.save();
    console.log(result);
    res.end();
  }
});

module.exports = router;
