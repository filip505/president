import presidentService from '../../src/route/president/president.service'

describe('reverse first name', () => {

  it('no first name', async () => {
    const name = 'Lastname'
    const res = presidentService.reverseFirstNames(name)
    expect(res).toBe(name)
  })

  it('first name', async () => {
    const name = 'Firstname Lastname'
    const res = presidentService.reverseFirstNames(name)
    expect(res).toBe('emantsriF Lastname')
  })

  it('two first name', async () => {
    const name = 'Firstname Firstname Lastname'
    const res = presidentService.reverseFirstNames(name)
    expect(res).toBe('emantsriF emantsriF Lastname')
  })


  it('two first name and two lastnames', async () => {
    const name = 'Firstname Firstname L. Lastname'
    const res = presidentService.reverseFirstNames(name)
    expect(res).toBe('emantsriF emantsriF L. Lastname')
  })

})