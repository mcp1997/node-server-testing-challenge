const db = require('../../data/dbConfig')
const Char = require('./characters-model')

test('it is the correct enviornment for the tests', () => {
  expect(process.env.DB_ENV).toBe('testing')
}, 2500)

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})

describe('Melee characters db access functions', () => {
  describe('Char.create', () => {
    it('adds a new character to the database', async () => {
      await Char.create({ char_name: 'fox' })
      const rows = await db('characters')
      expect(rows).toHaveLength(3)
    }, 2500)
    it('resolves to the newly created character', async () => {
      const newChar = await Char.create({ char_name: 'fox' })
      expect(newChar).toMatchObject({ char_id: 3, char_name: 'fox' })
    }, 2500)
  })

  describe('Char.remove', () => {
    it('deletes a character from the database', async () => {
      await Char.remove(2)
      const rows = await db('characters')
      expect(rows).toHaveLength(1)
    }, 2500)
    it('resolves to the deleted character', async () => {
      const deletedChar = await Char.remove(2)
      expect(deletedChar).toMatchObject({ char_id: 2, char_name: 'captain falcon' })
    }, 2500)
  })
})