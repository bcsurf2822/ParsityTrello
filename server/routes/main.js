const router = require("express").Router();
const faker = require("faker");

const { Label, Card, Board, User, List, Comment } = require("../models/models");

const boardTitles = ["Frontend", "Backend", "Project"];
const progress = ["To Do", "Doing", "Done", "RoadBlocks"];
const usernames = ["ben", "nick", "joseph"];
const passwords = ["let", "tan", "trello", "eagles", "cat", "dog"];

router.get("/generate-boards", async (req, res, next) => {
  try {
    // Generate users
    const users = [];
    for (let i = 0; i < 2; i++) {
      let user = new User();

      user.username = faker.random.arrayElement(usernames);
      user.password = faker.random.arrayElement(passwords);

      await user.save();
      users.push(user);
    }

    // Generate boards, lists, cards, and comments
    for (let i = 0; i < 2; i++) {
      let board = new Board();
      board.title = faker.random.arrayElement(boardTitles);

      // Create lists and add them to the board
      for (let j = 0; j < 2; j++) {
        let list = new List();
        list.title = faker.random.arrayElement(progress);

        // Create cards and add them to the list
        for (let k = 0; k < 2; k++) {
          let card = new Card();
          card.title = faker.lorem.sentence();
          card.description = faker.lorem.paragraph();

          // Create comments and add them to the card
          for (let l = 0; l < 2; l++) {
            let comment = new Comment();
            comment.comment = faker.lorem.sentence();
          
            // Set comment.user to a random user from the generated users
            const randomUser = faker.random.arrayElement(users);
            comment.user = {
              _id: randomUser._id,
              username: randomUser.username,
            };
          
            // Save the comment
            await comment.save();
          
            // Add the comment to the card's comments array
            card.comments.push(comment);
          
            // Add the comment to the user's comments array
            randomUser.comments.push(comment._id);
            await randomUser.save();
          }

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
      .send({ message: "Boards, lists, cards, users, and comments generated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error occurred generating" });
  }
});



module.exports = router;
