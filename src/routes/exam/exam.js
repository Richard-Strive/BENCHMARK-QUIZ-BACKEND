const express = require("express");
const { join } = require("path");
const { getFile, writeFile } = require("../../weapons/swords");
const uniqid = require("uniqid");
const { write, readFile } = require("fs");

/*
 Riferimento path const pathQuiz= join(__dirname,"./quiz.json")  OK
 Riferimento path const pathExam= join(__dirname,"./exam.json")  OK

1. Probabilmente fare il post su un json file solo per l'esame   OK

2. collegare il post anche al file quiz.json per generare 5 quiz random dal array di domande OK 

3. Eliminare da answer la proprieta' isCurrect

4. Creare il route /:id/answer

5. connetere il route con il file exam.json





const correct= answers.map((answer)=> answer.isCurrect===true)

if(correct){
    score: +=1
}else{
    console.log("The answer it's wrong")
}


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
      providedAnswer: null,
      totalDuration: 30,
      questions: [
        questionDB[Math.floor(Math.random() * questionDB.length)],
        // questionDB[Math.floor(Math.random() * questionDB.length)],
        // questionDB[Math.floor(Math.random() * questionDB.length)],
        // questionDB[Math.floor(Math.random() * questionDB.length)],
        // questionDB[Math.floor(Math.random() * questionDB.length)],
      ],
    };

    // delete newUserExam.question[0].answers;

    newUserExam.questions.map((quiz) =>
      quiz.answers.map((answer) => delete answer.isCorrect)
    );

    examDB.push(newUserExam);
    writeFile(examPath, examDB);
    res.status(201).send(newUserExam);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

route.post("/:id/answer", async (req, res, next) => {
  try {
    const examDB = await getFile(examPath);
    const questionDB = await getFile(examQuiz);

    const user = examDB.find((user) => user.id === req.params.id);
    const { question, answer } = req.body;

    if (user) {
      //   newAnswers = {
      //     ...req.body,
      //   };
      user.providedAnswer = question;
      user.answers = answer;
    } else {
      console.log("USER NO FOUND");
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = route;
