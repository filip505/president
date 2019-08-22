import presidentService from '../../src/route/president/president.service'
import parties from '../../src/helper/partysList'
describe('exclude party', () => {

  it('test', async () => {
    const data = [{
      "pp": parties.republican.key,
    },
    {
      "pp": parties.democrat.key,
    },
    {
      "pp": parties.democrat.key,
    },
    {
      "pp": parties.democraticRepublican.key,
    },
    {
      "pp": parties.democraticRepublican.key,
    }]

    const res = presidentService.excludeParty(data, parties.democrat.key)

    expect(res.length).toBe(3)
    for(let item in data){
      expect(item).not.toBe(parties.democrat.key)
    }
  })

})