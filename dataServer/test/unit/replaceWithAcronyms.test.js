import presidentService from '../../src/route/president/president.service'
import parties from '../../src/helper/partysList'

describe('replace With Actonyms', () => {

  it('replace one acronym', async () => {
    const name = parties.democrat.key
    const res = presidentService.replaceWithAcronyms(name)
    expect(res).toBe(parties.democrat.acronym)
  })

  it('replace more Actonyms', async () => {
    const name = `${parties.democrat.key}, ${parties.federalist.key}, ${parties.republican.key}`
    const res = presidentService.replaceWithAcronyms(name)
    expect(res).toBe( `${parties.democrat.acronym}, ${parties.federalist.acronym}, ${parties.republican.acronym}`)
  })

  it('replace not exsisting Actonym', async () => {
    const name = `${parties.democrat.key}, 'bla', ${parties.federalist.key}, ${parties.republican.key}, 'blabla`
    const res = presidentService.replaceWithAcronyms(name)
    expect(res).toBe( `${parties.democrat.acronym}, ${parties.federalist.acronym}, ${parties.republican.acronym}`)
  })
  
})