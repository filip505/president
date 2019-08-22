import server from '../../src/server'
import supertest from 'supertest'
import parties from '../../src/helper/partysList'
import csvService from '../mock/csv.service'

describe('postPresident Controller', () => {

  let app
  beforeAll(async () => {
    app = await server()
  })

  it('valid request', async () => {
    const requestDto = [{
      "id": 1,
      "president": 1,
      "nm": "Aaab L. L. Lastname",
      "pp": parties.republican.key,
      "tm": "1789-1997"
    },
    {
      "id": 2,
      "president": 2,
      "nm": "Aaab L. L. Lastname",
      "pp": parties.democrat.key,
      "tm": "1889-1997"
    },
    {
      "id": 3,
      "president": 3,
      "nm": "Aaaa Adams",
      "pp": parties.democraticRepublican.key,
      "tm": "1797-1901"
    },
    {
      "id": 4,
      "president": 4,
      "nm": "Aaac Adams",
      "pp": parties.whig.key,
      "tm": "1897-1801"
    },
    {
      "id": 5,
      "president": 5,
      "nm": "Aaaa Adams",
      "pp": parties.nationalUnion.key,
      "tm": "2000-"
    },
    {
      "id": 6,
      "president": 6,
      "nm": "Timo Raams",
      "pp": parties.federalist.key,
      "tm": "1780-2000"
    }
    ]

    const response = await supertest(app)
      .post('/president')
      .send(requestDto)
      .expect(201)
    
    expect(response.res.text).toBe('id')
    expect(csvService.generateCsv.mock.calls.length).toBe(1);
    
  })

  it('invalid request - missing id', async () => {
    const requestDto = [{
      "president": 1,
      "nm": "Timo Raams",
      "pp": parties.republican.key,
      "tm": "1789-1997"
    }]

    await supertest(app)
      .post('/president')
      .send(requestDto)
      .expect(404)

  })

  it('invalid request - missing president', async () => {
    const requestDto = [{
      "id": 1,
      "nm": "Timo Raams",
      "pp": parties.republican.key,
      "tm": "1789-1997"
    }]

    await supertest(app)
      .post('/president')
      .send(requestDto)
      .expect(404)

  })

  it('invalid request - missing nm', async () => {
    const requestDto = [{
      "id": 1,
      "president": 1,
      "pp": parties.republican.key,
      "tm": "1789-1997"
    }]

    await supertest(app)
      .post('/president')
      .send(requestDto)
      .expect(404)

  })

  it('invalid request - missing pp', async () => {
    const requestDto = [{
      "id": 1,
      "president": 1,
      "nm": "Timo Raams",
      "tm": "1789-1997"
    }]

    await supertest(app)
      .post('/president')
      .send(requestDto)
      .expect(404)

  })

  it('invalid request - missing tm', async () => {
    const requestDto = [{
      "id": 1,
      "president": 1,
      "nm": "Timo Raams",
      "pp": parties.republican.key
    }]

    await supertest(app)
      .post('/president')
      .send(requestDto)
      .expect(404)

  })

  it('invalid request - sending object instead of list', async () => {
    const requestDto = {
      "id": 1,
      "president": 1,
      "nm": "Timo Raams",
      "pp": parties.republican.key
    }

    await supertest(app)
      .post('/president')
      .send(requestDto)
      .expect(404)

  })



  afterAll((done) => {
    app.close(() => {
      console.log('Closed out remaining connections');
      done()
    })
  })
})