import server from '../../src/server'
import csvService from '../mock/csv.service'
import supertest from 'supertest'

describe('get president', () => {

  let app
  beforeAll(async () => {
    app = await server()
  })

  it('valid request', async () => {
    const filename = 'filename'
    const response = await supertest(app)
      .get(`/president/${filename}`)
      .expect(200)
    expect(response.res.text).toBe('data')
    expect(response.res.headers['content-disposition']).toBe(`attachment; filename=${filename}.csv`)
    expect(csvService.fetchCsv.mock.calls.length).toBe(1);
    expect(csvService.fetchCsv.mock.calls[0][0]).toBe(filename)
  })

  it('empty request', async () => {
    const filename = 'filename'
    await supertest(app)
      .get(`/president/`)
      .expect(404)
  })

  afterAll((done) => {
    app.close(() => {
      console.log('Closed out remaining connections');
      done()
    })
  })
})