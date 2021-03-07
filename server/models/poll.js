const data = require("../data.js");
const { response } = require("../server.js");
const pollsData = data.polls;

class Poll {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.responses = data.responses
  }
  static get all() {
    const polls = pollsData.map((poll) => new Poll(poll));
    return polls;
  }
  static get create() {
    const newPollId = pollsData.length + 1;
    const newPoll = new Poll({ id: newPollId, ...poll });
    pollsData.push(newPoll);
    return newPoll;
  }
  static findById(id) {
    try {
      const pollData = pollsData.filter((poll) => poll.id === id)[0];
      const poll = new Poll(pollData);
      return poll;
    } catch (err) {
      throw new Error("Poll not found");
    }
  }
  updateVotes(responseId, ip) {
    try {
      const responseToUpdate = this.responses.filter(item => item.id === responseId)[0].votes
      responseToUpdate.indexOf(String(ip)) === -1 ? responseToUpdate.push(String(ip)) :  err
    } catch (err) {
        throw new Error("ip has already voted")
    }
  }
  destroy() {
    const pollToDestroy = pollsData.filter(
      (poll) => pollToDestroy.id === poll.id
    )[0];
    pollsData.splice(pollsData.indexOf(pollToDestroy), 1);
  }
}

module.exports = Poll;
