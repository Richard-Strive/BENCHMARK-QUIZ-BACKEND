const express = require("express");
const uniqid = require("uniqid");

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
