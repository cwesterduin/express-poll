const express = require('express')
const server = express()

server.get('/', (req, res) => {
    res.send('hello world!')
})

server.get('/polls', (req, res) => {
    res.send('hello polls!')
})

server.post('/', (req, res) => {
    res.status(405).send('Not allowd!');
});

module.exports = server