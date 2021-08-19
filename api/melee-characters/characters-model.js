const db = require('../../data/dbConfig')

async function getByID(id) {
  const stuff = await db('characters').where('char_id', id).first()
  return stuff
}

async function create(character) {
  const [id] = await db('characters').insert(character)
  const newChar = await getByID(id)
  return newChar
}

module.exports = {
  getByID,
  create
}