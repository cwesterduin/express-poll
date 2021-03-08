// import server
const server = require('../../server');
const supertest = require('supertest');
const request = supertest(server);


describe('Get routes', () => {
    let api
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

    it('Responds with 200', (done) => {
      request.get('/').expect(200, done);
    })
    it('responds to non existing paths with 404', (done) => {
      request.get('/no').expect(404, done);
    });
    it('responds to an incorrect post with 405', (done) => {
        request.post('/').expect(405, done);
    });
})