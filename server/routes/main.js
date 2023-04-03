const router = require("express").Router();
const faker = require('faker');

const {Label, Card, Board, User, List, Comment} = require("../models/models")
const boardTitles = ["Frontend", "Backend", "Project"];
const progress = ["To Do", "Doing", "Done", "RoadBlocks"];

//to generate boards with lists
router.get("/generate-boards", async (req, res, next) => {
  try {
    for (let i = 0; i < 1; i++) {
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
router.delete("/boards/:board", async (req, res, next) => {
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

//Get lists
router.get("/board/:board/lists", async (req, res) => {
  try {
    const boardById = await Board.findById(req.params.board).populate("lists");
    res.json(boardById.lists);
  } catch (error) {
    console.error("Error fetching lists data", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Post Lists
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

    await boardById.save();
    res.status(201).send(newList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "error" });
  }
});

//Delete Lists
router.delete("/boards/:boardId/lists/:listId", async (req, res, next) => {
  try {
    const { boardId, listId } = req.params;
    const boardById = await Board.findById(boardId);

    if (!boardById) {
      res.status(404).send({error: "Invalid Board ID"});
    }

    const listIndex = boardById.lists.findIndex(list => list._id.toString() === listId);

    if (listIndex === -1) {
      return res.status(404).send({ error: "List not found in the board" });
    }

    boardById.lists.splice(listIndex, 1);

    await boardById.save();

    res.status(200).send({message: "List Deleted"});
  } catch (err) {
    console.log(err);
    res.status(500).send({error: "Server Error"});
  }
});

//Get Cards
router.get("/board/:boardId/lists/:listId", async (req, res) => {
  try {
    const { boardId, listId } = req.params;
    const boardById = await Board.findById(boardId);

    if (!boardById) {
      return res.status(404).send({ error: "Board not found" });
    }

    const listInBoard = boardById.lists.find(list => list._id.toString() === listId);

    if (!listInBoard) {
      return res.status(404).send({ error: "List not found in the board" });
    }

    const list = await List.findById(listId).populate("cards");

    if (!list) {
      return res.status(404).send({ error: "List not found" });
    }

    res.status(200).send(list);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "error" });
  }
});

//Post Cards
router.post("/board/:boardId/lists/:listId", async (req, res, next) => {
  try {
    const { boardId, listId } = req.params;
    const boardById = await Board.findById(boardId);

    if (!boardById) {
      return res.status(404).send({ error: "Board not found" });
    }

    const listInBoard = boardById.lists.find(list => list._id.toString() === listId);

    if (!listInBoard) {
      return res.status(404).send({ error: "List not found in the board" });
    }

    const list = await List.findById(listId);

     if (!list) {
      return res.status(404).send({ error: "List not found" });
    }

    const postedCard = req.body;
    const newCard = new Card(postedCard);
    await newCard.save();

    list.cards.push(newCard);

    await list.save();
    res.status(201).send(newCard);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "error" });
  }
});

// Update cards
router.patch("/boards/:boardId/lists/:listId/cards/:cardId", async (req, res, next) => {
  try {
    const { boardId, listId, cardId } = req.params;
    const updateData = req.body;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).send({ error: "Board not found" });
    }

    const list = await List.findOne({ _id: listId, "cards._id": cardId });

    if (!list) {
      return res.status(404).send({ error: "Card not found in the list" });
    }

    const cardIndex = list.cards.findIndex(card => card._id.toString() === cardId);

    if (cardIndex === -1) {
      return res.status(404).send({ error: "Card not found in the list" });
    }

    Object.assign(list.cards[cardIndex], updateData);

    await list.save();
    res.status(200).send({ message: "Card updated", card: list.cards[cardIndex] });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
});

// Delete cards
router.delete("/boards/:boardId/lists/:listId/cards/:cardId/delete", async (req, res, next) => {
  try {
    const { boardId, listId, cardId } = req.params;
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).send({ error: "Invalid Board ID" });
    }

    const listInBoard = board.lists.find(list => list._id.toString() === listId);

    if (!listInBoard) {
      return res.status(404).send({ error: "List not found in the board" });
    }

    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).send({ error: "List not found" });
    }

    const cardIndex = list.cards.findIndex(card => card._id.toString() === cardId);

    if (cardIndex === -1) {
      return res.status(404).send({ error: "Card not found in the list" });
    }

    list.cards.splice(cardIndex, 1);

    await list.save();

    res.status(200).send({ message: "Card Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
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
});


module.exports = router;
