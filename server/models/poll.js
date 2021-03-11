const data = require("../data.js");
const { response } = require("../server.js");
const pollsData = data.polls;

class Poll {
  constructor(data) {
    this.id = data.id;
    this.password = data.password
    this.name = data.name;
    this.responses = data.responses
  }
  static get all() {
    const polls = pollsData.map((poll) => new Poll(poll));
    return polls;
  }
  static create(poll) {
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
      throw new Error("poll not found");
    }
  }
  updateVotes(responseId, ip) {
    try {
      let ipCheckArr = []
      const responseToUpdate = this.responses.filter(item => item.id === responseId)[0].votes
      this.responses.forEach(response => response.votes.forEach(vote => ipCheckArr.push(vote)))
      ipCheckArr.includes(String(ip)) ? err : responseToUpdate.push(String(ip))
    } catch (err) {
        throw new Error("ip has already voted")
    }
  }
  destroy() {
    const pollToDestroy = pollsData.filter(
      (poll) => poll.id === this.id
    )[0];
    pollsData.splice(pollsData.indexOf(pollToDestroy), 1);
  }
}

module.exports = Poll;
