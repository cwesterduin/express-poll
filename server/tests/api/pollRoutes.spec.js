// import server
const server = require('../../server');
const supertest = require('supertest');
const request = supertest(server);

var util = require('util');
util.inspect.defaultOptions.depth = null; //enable full object reproting in console.log

let testPoll = {
    id: 1,
    name: "poll123",
    responses: [
      { id: 1, title: "Yes", votes: ["11.11.11", "22.22.22"] },
      { id: 2, title: "No", votes: ["33.33.33"] },
    ],
  }
let patchPoll = {
    id: 1,
    name: "poll123",
    responses: [
      { id: 1, title: "Yes", votes: ["11.11.11", "22.22.22", "::ffff:127.0.0.1"] },
      { id: 2, title: "No", votes: ["33.33.33"] },
    ],
  }

describe('Test for poll specific routes', () => {
    
    it('Responds with 200 to /polls', (done) => {
      request.get('/polls').expect(200, done);
    })

    describe('Get specific poll', () => {
        it('Responds to request for specific poll with 200', (done) => {
            request.get('/polls/1').expect(200, done);
        })
        it('Responds to request for specific poll with poll data', (done) => {
            request.get('/polls/1').expect({...testPoll}, done)
        })
    })

    describe('Vote on a poll', () => {
        it('Responds to patch polls/:id/votes by updating votes with another item and code 200', (done) => {
            request.patch('/polls/1/votes')
            .send({id: 1})
            .expect(200)
            .expect({...patchPoll}, done);
        })
    })


})