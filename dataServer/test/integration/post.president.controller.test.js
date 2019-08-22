import server from '../../src/server'
import supertest from 'supertest'
import parties from '../../src/helper/partysList'

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
    
    const responseDto = JSON.parse(response.res.text)

    // We need to devide presidents by centurys the year they were in power, that means results should contain 3 child elements
    expect(Object.values(responseDto).length).toBe(3)
    // All together response should containt 5 elements (6 in request - 1 from federal list)
    let allTogether = []
    for (let century in responseDto) {
      allTogether = [...allTogether, ...responseDto[century]]
    }
    expect(Object.values(allTogether).length).toBe(5)
    // objects should be named by centurys, based on request we should contain 18, 19, 29 object
    expect(responseDto['18']).not.toBeUndefined()
    expect(responseDto['19']).not.toBeUndefined()
    expect(responseDto['20']).not.toBeUndefined()

    // First element should contain 2 elements and they should be orderd by alphabet
    expect(Object.values(responseDto['18']).length).toBe(2)
    // first element should have {id: 3, name: aaaA Adams, pp: DR)
    expect(responseDto['18'][0].id).toBe(3)
    expect(responseDto['18'][0].nm).toBe('aaaA Adams')
    expect(responseDto['18'][0].pp).toBe(parties.democraticRepublican.acronym)
    expect(responseDto['18'][0].tm).toBe('01-01-1797')
    // second element should have {id: 3, name: baaA L. L. Lastname, pp: RP)
    expect(responseDto['18'][1].id).toBe(1)
    expect(responseDto['18'][1].nm).toBe('baaA L. L. Lastname')
    expect(responseDto['18'][1].pp).toBe(parties.republican.acronym)
    expect(responseDto['18'][1].tm).toBe('01-01-1789')

    // Second element should contain 2 elements and they should be orderd by alphabet
    expect(Object.values(responseDto['19']).length).toBe(2)

    expect(responseDto['19'][0].id).toBe(2)
    expect(responseDto['19'][0].nm).toBe('baaA L. L. Lastname')
    expect(responseDto['19'][0].pp).toBe(parties.democrat.acronym)
    expect(responseDto['19'][0].tm).toBe('01-01-1889')

    expect(responseDto['19'][1].id).toBe(4)
    expect(responseDto['19'][1].nm).toBe('caaA Adams')
    expect(responseDto['19'][1].pp).toBe(parties.whig.acronym)
    expect(responseDto['19'][1].tm).toBe('01-01-1897')

    // Third element should contain 2 elements and they should be orderd by alphabet
    expect(Object.values(responseDto['20']).length).toBe(1)

    expect(responseDto['20'][0].id).toBe(5)
    expect(responseDto['20'][0].nm).toBe('aaaA Adams')
    expect(responseDto['20'][0].pp).toBe(parties.nationalUnion.acronym)
    expect(responseDto['20'][0].tm).toBe('01-01-2000')

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