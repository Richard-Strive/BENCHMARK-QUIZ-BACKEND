const badRequestHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 400) {
    res.status(400).send(err.msg || "Your are making a bad request.");
  } else {
    next(error);
  }
};
const unauthorizedHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 401) {
    res.status(401).send(err.msg || "UNAUTHORIZED!!!");
  } else {
    next(error);
  }
};

const frobiddenHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 403) {
    res.status(403).send(err.msg || "Forbidden attempt");
  } else {
    next(error);
  }
};

const notFoundHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).send(err.msg || "Resource not found!");
  } else {
    next(error);
  }
};
const catchAllErrorHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 500) {
    res
      .status(500)
      .send(err.msg || "Generic error occured from the server side");
  } else {
    next(error);
  }
};

module.exports = {
  badRequestHandler,
  unauthorizedHandler,
  frobiddenHandler,
  notFoundHandler,
  catchAllErrorHandler,
};
