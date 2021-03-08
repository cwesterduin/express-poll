// import data
const data = require('../../data');
const pollsData = data.polls
// import model
const Poll = require('../../models/poll');

describe('Poll model', () => {
    const testPoll = {
        name: "poll123",
        responses: [
          { id: 1, title: "Yes", votes: [] },
          { id: 2, title: "No", votes: [] },
        ],
      }

        it('should make an instance of a poll', () => {
            const poll = new Poll({ id: 10, ...testPoll });

            expect(poll.id).toBe(10);
            expect(poll.name).toBe('poll123');
            expect(poll.responses).toHaveLength(2);
        });

    it('should return all polls', () => {
        const polls = Poll.all;

        expect(polls).toEqual(pollsData);
    });

    it('should return a poll', () => {
        const poll = Poll.findById(1);

        expect(poll).toEqual(pollsData[0]);
    });

    it('should throw an error if no poll', () => {
        function testError() {
            Poll.findById(0);
        }

        expect(testError).toThrowError('poll not found');
    });

    it('should create a poll', () => {
        const newPollId = pollsData.length + 1;
        const newPoll = Poll.create(testPoll);

        expect(newPoll).toEqual({ id: newPollId, ...testPoll });
    });

    it('should delete a poll', () => {
        const pollToDestroyId = pollsData.length;
        const pollToDestroy = pollsData[pollToDestroyId - 1];
        pollToDestroy.destroy();

        expect(pollToDestroy).toEqual({ id: pollToDestroyId, ...testPoll });
        expect(pollsData).not.toContain(pollToDestroy);
    });

    it('should update a poll\'s responses', () => {
        const pollToTest = Poll.findById(1);
        const responseToUpdate = pollToTest.responses.filter(item => item.id === 1)[0].votes
        pollToTest.updateVotes(1, '00.11.22')

        expect(responseToUpdate).toContain('00.11.22');
    });

    it('should throw an error if ip exists on poll\'s responses', () => {
        function testError() {
            const pollToTest = Poll.findById(1);
            const responseToUpdate = pollToTest.responses.filter(item => item.id === 1)[0].votes
            pollToTest.updateVotes(1, '11.11.11')
        }

        expect(testError).toThrowError('ip has already voted');
    });

});
