const express = require('express')
const Chars = require('./melee-characters/characters-model')
const db = require('../data/dbConfig')

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

async function validateID(req, res, next) {
  const [existing] = await db('characters').where('char_id', req.params.id)

  if (!existing) {
    res.status(404).json({
      messsage: `character with char_id ${req.params.id} not found`
    })
  } else {
    next()
  }
}

server.delete('/characters/:id', validateID, (req, res, next) => {
  Chars.remove(req.params.id)
    .then(deleted => {
      res.status(200).json(deleted)
    })
    .catch(next)
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server