const express = require("express");
const server = express();
const bodyParser = require("body-parser");

server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("hello world!");
});

const pollRoutes = require("./controllers/polls");
server.use("/polls", pollRoutes);

server.post("/", (req, res) => {
  res.status(405).send("Not allowd!");
});

module.exports = server;
