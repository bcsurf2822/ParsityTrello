const router = require("express").Router();
const faker = require('faker');
const { User, Board, List, Comment, Card } = require("../models/models");

const colors = ["Green", "Yellow", "Orange", "Red", "Blue"];

//to generate fake data
router.get("/generate-lists", (req, res, next) => {
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
