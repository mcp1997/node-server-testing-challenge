const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' })
})

server.post('/characters', (req, res) => {
  res.end()
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