const express = require("express");
const router = express.Router();

const Poll = require("../models/poll");

router.get("/", (req, res) => {
  const pollData = Poll.all;
  res.send(pollData);
});

router.get("/:id", (req, res) => {
  try {
    const pollId = parseInt(req.params.id);
    const selectedPoll = Poll.findById(pollId);
    res.send(selectedPoll);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

router.patch("/:id/votes", (req, res) => {
    const responseId = parseInt(req.body.id)
    try {
      const pollId = parseInt(req.params.id);
      const polltoUpdate = Poll.findById(pollId)
      polltoUpdate.updateVotes(responseId, req.ip);
      res.status(200).send(polltoUpdate);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  });

// router.post('/', (req, res) => {
//     const data = req.body;
//     const newFilm = Film.create(data);
//     res.status(201).send(newFilm);
// });

// router.delete('/:id', (req, res) => {
//     const filmID = parseInt(req.params.id)
//     const filmToDestroy = Film.findById(filmID);
//     filmToDestroy.destroy()
//     res.status(204).send();
// });

module.exports = router;
