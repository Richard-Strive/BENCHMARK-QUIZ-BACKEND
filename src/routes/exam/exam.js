const express = require("express");
const { join } = require("path");
const { getFile, writeFile } = require("../../weapons/swords");
const uniqid = require("uniqid");

/*
 Riferimento path const pathQuiz= join(__dirname,"./quiz.json")

1. Probabilmente fare il post su un json file solo per l'esame

2. collegare il post anche al file quiz.json per generare 5 quiz random dal array di domande


*/

const route = express.Router();

route.post("/start", async (req, res, next) => {
  try {
    console.log("Hello");
    res.status(200).send("OK /start it's working");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = route;
