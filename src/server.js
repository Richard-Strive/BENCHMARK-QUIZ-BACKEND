const express = require("express");
const listEndpoints = require("express-list-endpoints");

const cors = require("cors");
require("dotenv").config();

const {
  badRequestHandler,
  unauthorizedHandler,
  frobiddenHandler,
  notFoundHandler,
  catchAllErrorHandler,
} = require("./problematicRoutes/errorHandling");

const examRoute = require("./routes/exam/exam");
const server = express();

server.use(cors());
server.use(express.json());

const port = process.env.PORT || 5001;

server.use("/exam", examRoute);

/*<---------
mettere qui gli endpoints con la sintassi e.g:
server.use("/exam", submit)
server.use("/exam", examScore)
----------->*/

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(frobiddenHandler);
server.use(notFoundHandler);
server.use(catchAllErrorHandler);

server.listen(port, () => {
  console.log(`Running localhost:${port}`);
});

console.log(listEndpoints(server));
