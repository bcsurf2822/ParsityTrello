
const router = require("express").Router();
const Board = require("../models/boardSchema")
router.get("/boards", async (req, res, next) => {

  try {
    const boards = await Board.find()

    const response = {
      boards: boards
    };

    console.log(response)
    res.send(response.boards);
  } catch (err) {
    console.log(err)
    res.status(500).send({error: "network error"})
  }
});

module.exports = router;