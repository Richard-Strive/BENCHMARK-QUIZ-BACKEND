const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
require("dotenv").config();

// const {
//     notFoundErrorHandler,
//     unauthorizedErrorHandler,
//     forbiddenErrorHandler,
//     badRequestErrorHandler,
//     catchAllErrorHandler,
//   } = require("./errorHandling")
const server = express();

server.use(cors());
server.use(express.json());

const port = process.env.PORT || 5001;

/*<---------


mettere qui gli endpoints con la sintassi e.g:

server.use("/exam", examRoute)
server.use("/exam", submit)
server.use("/exam", examScore)


----------->*/

// server.use(notFoundErrorHandler);
// server.use(unauthorizedErrorHandler);
// server.use(forbiddenErrorHandler);
// server.use(badRequestErrorHandler);
// server.use(catchAllErrorHandler);

server.listen(port, () => {
  console.log(`Running localhost:${port}`);
});

console.log(listEndpoints(server));
