const express = require("express");
const { join } = require("path");
const { getFile, writeFile } = require("../../weapons/swords");
const uniqid = require("uniqid");
const { write } = require("fs");

/*
 Riferimento path const pathQuiz= join(__dirname,"./quiz.json")  OK
 Riferimento path const pathExam= join(__dirname,"./exam.json")  OK

1. Probabilmente fare il post su un json file solo per l'esame   OK

2. collegare il post anche al file quiz.json per generare 5 quiz random dal array di domande OK 

3. Eliminare answers 

*/

const route = express.Router();

const examPath = join(__dirname, "./exam.json");
const examQuiz = join(__dirname, "./question.json");

route.post("/start", async (req, res, next) => {
  try {
    const examDB = await getFile(examPath);
    const questionDB = await getFile(examQuiz);
    const newUserExam = {
      id: uniqid(),
      ...req.body,
      examDate: new Date(),
      isComplated: false,
      name: "Admission Test",
      totalDuration: 30,
      question: [
        questionDB[Math.floor(Math.random() * questionDB.length)],
        questionDB[Math.floor(Math.random() * questionDB.length)],
        questionDB[Math.floor(Math.random() * questionDB.length)],
        questionDB[Math.floor(Math.random() * questionDB.length)],
        questionDB[Math.floor(Math.random() * questionDB.length)],
      ],
    };

    // delete newUserExam.question[0].answers;

    newUserExam.question.map((quiz) => delete quiz.answers);

    examDB.push(newUserExam);
    writeFile(examPath, examDB);
    res.status(201).send(newUserExam);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = route;
