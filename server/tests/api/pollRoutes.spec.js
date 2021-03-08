// import server
const server = require('../../server');
const request = require('supertest');


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
    let api;
    let postPoll = {
        name: "poll221",
        responses: [
          {
            id: 1,
            title: "Yes",
            votes: []
          },
          {
            id: 2,
            title: "No",
            votes: []
          }
        ]
      }
    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(5000, () =>
            console.log('Test server running on port 5000')
        );
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('Gracefully stopping test server');
        api.close(done);
    });
    
    it('responds with 200 to /polls', (done) => {
        request(api).get('/polls').expect(200, done);
    })

    describe('Get specific poll', () => {
        it('responds to request for specific poll with 200', (done) => {
            request(api).get('/polls/1').expect(200, done);
        })
        it('responds to request for specific poll with poll data', (done) => {
            request(api).get('/polls/1').expect({...testPoll}, done)
        })
        it('responds to a unknown poll id with a 404', (done) => {
            request(api).get('/polls/42').expect(404).expect({}, done);
        });
    })

    describe('Create a poll', () => {
        it('response to post request and creates a new poll', (done) => {
            request(api)
            .post('/polls')
            .send(postPoll)
            .expect(201)
            .expect({ id: 3, ...postPoll }, done);
        })
    })


    describe('Vote on a poll', () => {
        it('responds to patch polls/:id/votes by updating votes with another item and code 200', (done) => {
            request(api).patch('/polls/1/votes')
            .send({id: 1})
            .expect(200)
            .expect({...patchPoll}, done);
        })
    })
    describe('Vote on a poll with same ip', () => {
        it('responds to patch polls/:id/votes with error if ip has response already', (done) => {
            request(api).patch('/polls/2/votes')
            .send({id: 2})
            .expect(404).expect({}, done);
        })
    })


})