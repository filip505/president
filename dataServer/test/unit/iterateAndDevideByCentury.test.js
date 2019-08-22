import presidentService from '../../src/route/president/president.service'

describe('itereate and devide by century', () => {

  it('test', async () => {
    const data = [{
      "id": 1,
      "tm": "1789-1997"
    },
    {
      "id": 2,
      "tm": "1889-1997"
    },
    {
      "id": 3,
      "tm": "1797-1901"
    },
    {
      "id": 4,
      "tm": "1897-1801"
    },
    {
      "id": 5,
      "tm": "2000-"
    },
    {
      "id": 6,
      "tm": "1780-2000"
    }
    ]
    const res = presidentService.iterateAndDevideByCentury(data, (item) => {
      item.id = item.id * 2
      return item
    })

    let allTogether = []
    for (let century in res) {
      allTogether = [...allTogether, ...res[century]]
    }

    expect(Object.values(allTogether).length).toBe(6)
    expect(Object.values(res['18']).length).toBe(3)
    expect(Object.values(res['19']).length).toBe(2)
    expect(Object.values(res['20']).length).toBe(1)
  })

})