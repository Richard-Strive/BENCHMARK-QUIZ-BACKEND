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

3. Eliminare da answer la proprieta' isCurrect OK

4. Creare il route /:id/answer OK

voglio ritornare una domanda selezionata dall'array tramite il numero

array.findIndex(user.providedAnswer)










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
      selectedQuestion: null,
      score: 0,
      totalDuration: 30,
      questions: [
        questionDB[Math.floor(Math.random() * questionDB.length)],
        questionDB[Math.floor(Math.random() * questionDB.length)],
        questionDB[Math.floor(Math.random() * questionDB.length)],
        questionDB[Math.floor(Math.random() * questionDB.length)],
        questionDB[Math.floor(Math.random() * questionDB.length)],
      ],
    };

    // delete newUserExam.question[0].answers;

    /* "providedAnswer":1,
  "selectedQuestion":3 */

    // newUserExam.questions.map((quiz) =>
    //   quiz.answers.map((answer) => delete answer.isCorrect)

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

    /* 
    DEVO AGGIUNGERE VALIDATORS E CORS 

    
    Per aggiungere lo score devo riscrivere il nuovo dato sul file... con writeFile
    
    1. Creando nuovo array e poi pushando il nuovo elementto OK 
    
    - Con score OK

    - Rimozione domanda appena fatta.
    
    /* if(selAnswer.isCorrect===true){
      user.score=+1
    }
    
    */
    const questionDB = await getFile(examQuiz);

    const newArray = [];
    const newUser = examDB.find((user) => user.id === req.params.id);

    const { selectedQuestion, providedAnswer } = req.body;

    const selQuestion = examDB.find((user) => user.id === req.params.id)
      .questions[selectedQuestion];
    const selAnswer = examDB.find((user) => user.id === req.params.id)
      .questions[selectedQuestion].answers[providedAnswer];

    // questionSelected = examDB[2].questions[0].answers[0];
    /* la goccia di miele quando volgio displayare qualcosa di un array devo specificare un index o appure fare un map per interaggire con essa*/
    //User.score=+1
    newArray.push(newUser);
    //

    // newAnswers= ...User

    if (newUser) {
      newAnswers = {
        ...req.body,
        selQuestion,
        selAnswer,
        test: 0,
      };

      newUser.providedAnswer = providedAnswer;

      newUser.selectedQuestion = selectedQuestion;
      if (selAnswer.isCorrect === true) {
        newUser.score = newUser.score + 1;
        writeFile(examPath, newArray);
      } else {
        newUser.score = newUser.score - 1;
        writeFile(examPath, newArray);
      }
    } else {
      console.log("USER NO FOUND");
    }
    // if (providedAnswer) {
    //   user.score += 1;
    // }

    /*
1 capire se devo scrivere in un file questi dati

2 sistemare la roba dei punteggi
*/

    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = route;
