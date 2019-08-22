import server from '../../src/server'
import fs from 'fs'
import supertest from 'supertest'

describe('post csv', () => {

  let app
  beforeAll(async () => {
    app = await server()
  })

  it('valid request', async () => {
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
    let response = await supertest(app)
      .post('/csv')
      .send(requestDto)
      .expect(201)

    response = await supertest(app)
      .get(`/csv/${response.res.text}`)
      .send(requestDto)
      .expect(200)

    const split = response.res.text.split('\n')

    expect(split.length).toBe(6)
    expect(split[0]).toBe('"Name","Party","Presidential term","President number","Ingestion Time"')
    expect(split[1].includes('"egroeG Washington",,"08-21-1789","1"')).toBeTruthy()
    expect(split[2].includes('"nhoJ Adams",,"08-21-1797","2"')).toBeTruthy()
    expect(split[3].includes('"dralliM Fillmore",,"08-21-1850","13"')).toBeTruthy()
    expect(split[4].includes('"drofrehtuR Hayes","RP","08-21-1877","19"')).toBeTruthy()
  })

  afterAll((done) => {
    app.close(() => {
      console.log('Closed out remaining connections');
      done()
    })
  })
})