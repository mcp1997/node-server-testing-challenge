const express = require('express')
const Chars = require('./melee-characters/characters-model')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' })
})

function validateChar(req, res, next) {
  if (!req.body.char_name || !req.body.char_name.trim()) {
    res.status(422).json({
      message: 'character name required'
    })
  } else {
    next()
  }
}

server.post('/characters', validateChar, (req, res, next) => {
  Chars.create(req.body)
    .then(newChar => {
      res.status(201).json(newChar)
    })
    .catch(next)
})

server.delete('/characters/:id', (req, res) => {
  res.end()
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server