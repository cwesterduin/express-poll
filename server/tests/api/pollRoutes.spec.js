// import server
const server = require('../../server');
const supertest = require('supertest');
const request = supertest(server);

let testPoll = {
    id: 1,
    name: 'poll123'
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
            request.get('/polls/1').expect({
                id: 1,
                name: 'poll123'
            }, done)
        })
    })


})