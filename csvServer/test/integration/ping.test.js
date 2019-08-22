import server from '../../src/server'

const supertest = require('supertest');

describe('ping', () => {

  let app
  beforeAll(async () => {
    app = await server()
  })

  it('ping request', async () => {
    const response = await supertest(app)
      .get('/ping')
      .expect(200)
    expect(response.res.text).toBe('pong')
  })

  afterAll((done) => {
    app.close(() => {
      console.log('Closed out remaining connections');
      done()
    })
  })
})