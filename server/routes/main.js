const router = require("express").Router();
const faker = require("faker");

const { Label, Card, Board, User, List, Comment } = require("../models/models");

const boardTitles = ["Frontend", "Backend", "Project"];
const progress = ["To Do", "Doing", "Done", "RoadBlocks"];

//to generate boards with lists
router.get("/generate-boards", async (req, res, next) => {
  try {
    for (let i = 0; i < 1; i++) {
      let board = new Board();
      board.title = faker.random.arrayElement(boardTitles);

      // Create lists and add them to the board
      for (let j = 0; j < 4; j++) {
        let list = new List();
        list.title = faker.random.arrayElement(progress);

        // Create cards and add them to the list
        for (let k = 0; k < 5; k++) {
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
    res
      .status(200)
      .send({ message: "Boards, lists and cards generated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error occurred generating" });
  }
});

module.exports = router;
