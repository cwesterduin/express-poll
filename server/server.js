const express = require('express')
const server = express()

server.get('/', (req, res) => {
    res.send('hello world!')
})

server.get('/polls', (req, res) => {
    res.send('hello polls!')
})

server.get('/polls/1', (req, res) => {
    res.send({
        id: 1,
        name: 'poll123'
    })
})


server.post('/', (req, res) => {
    res.status(405).send('Not allowd!');
});

module.exports = server