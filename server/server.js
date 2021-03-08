const express = require("express");
const server = express();
const bodyParser = require("body-parser");
var cors = require('cors')

server.use(bodyParser.json());
server.use(cors())

server.get("/", (req, res) => {
  res.send("hello world!");
});

const pollRoutes = require("./controllers/polls");
server.use("/polls", pollRoutes);

server.post("/", (req, res) => {
  res.status(405).send("Not allowed!");
});

module.exports = server;
