import server from '../../src/server'

const supertest = require('supertest');

describe('post csv', () => {

  let app
  beforeAll(async () => {
    app = await server()
  })

  it('ping request', async () => {
    const requestDto = {
      "18": [
        {
          "id": 1,
          "president": 1,
          "nm": "egroeG Washington",
          "tm": "08-21-1789"
        },
        {
          "id": 2,
          "president": 2,
          "nm": "nhoJ Adams",
          "tm": "08-21-1797"
        }
      ],
      "19": [
        {
          "id": 13,
          "president": 13,
          "nm": "dralliM Fillmore",
          "tm": "08-21-1850"
        },
        {
          "id": 19,
          "president": 19,
          "nm": "drofrehtuR Hayes",
          "pp": "RP",
          "tm": "08-21-1877"
        }
      ]
    }
    const response = await supertest(app)
      .post('/csv')
      .send(requestDto)
      .expect(201)

    const split = response.res.text.split('\n')
    expect(split.length).toBe(5)
    expect(split[0]).toBe('"Name","Party","Presidential term","Presidential number"')
    expect(split[1]).toBe('"egroeG Washington",,"08-21-1789",1')
    expect(split[2]).toBe('"nhoJ Adams",,"08-21-1797",2')
    expect(split[3]).toBe('"dralliM Fillmore",,"08-21-1850",13')
    expect(split[4]).toBe('"drofrehtuR Hayes","RP","08-21-1877",19')
  })

  afterAll((done) => {
    app.close(() => {
      console.log('Closed out remaining connections');
      done()
    })
  })
})