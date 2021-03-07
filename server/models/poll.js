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
  static updateVotes(id, responseId, ip) {
    const pollToUpdate = this.findById(id);
    const responseToUpdate = pollToUpdate.responses.filter(item => item.id === responseId)[0].votes
    responseToUpdate.push(String(ip))
    return pollToUpdate;
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
  destroy() {
    const pollToDestroy = pollsData.filter(
      (poll) => pollToDestroy.id === poll.id
    )[0];
    pollsData.splice(pollsData.indexOf(pollToDestroy), 1);
  }
}

module.exports = Poll;
