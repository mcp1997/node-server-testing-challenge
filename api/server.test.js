const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('[POST] /characters', () => {
  it('responds with a 422 if char_name is invalid', async () => {
    const res = await request(server).post('/characters').send({})
    expect(res.status).toBe(422)
  }, 5000)
  it('should return a 201 OK status', async () => {
    const res = await request(server).post('/characters').send({ char_name: 'jigglypuff' })
    expect(res.status).toBe(201)
  })
  it('responds with the newly created character', async () => {
    let res = await request(server).post('/characters').send({ char_name: 'jigglypuff' })
    expect(res.body).toMatchObject({ char_name: 'jigglypuff' })
    res = await request(server).post('/characters').send({ char_name: 'falco' })
    expect(res.body).toMatchObject({ char_name: 'falco' })
  })
})

describe('[DELETE] /characters/:id', () => {
  it('responds with a 404 if provided char_id does not exist', async () => {
    const res = await request(server).delete('/jokes/1')
    console.log(res)
    expect(res.status).toBe(404)
  })
  it('should return a 200 status', async () => {

  })
  it('responds with the deleted character', async () => {

  })
})