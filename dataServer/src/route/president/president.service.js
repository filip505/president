import moment from 'moment'
import { filterByField, sortAlphabetically } from '../../helper/array.helper'
import csvService from '../../csv/csv.service'
import parties from '../../helper/partysList'

class PresedentService {

  acronyms = {}

  constructor() {
    for (let party in parties) {
      this.acronyms[parties[party].key] = parties[party].acronym
    }
  }

  async convertData(data) {
    data = data.filter(filterByField('pp', parties.federalist.key))

    data = this.iterateAndDevideByCentury(data, (presedent) => {
      // by sending callback we are able to change all the values in one iteration 
      presedent.nm = this.reverseFirstNames(presedent.nm)
      presedent.pp = this.acronyms[presedent.pp]
      presedent.tm = moment(`${presedent.tm.slice(0, 4)}-01-01`).format('MM-DD-YYYY')
      return presedent
    })

    for (let key in data) {
      data[key].sort(sortAlphabetically('nm'))
    }
    return await csvService.generateCsv(data)
  }

  async getData(filename){
    return await csvService.fetchCsv(filename)
  }

  iterateAndDevideByCentury(data, callback) {
    const devidedData = {}
    for (let presedent of data) {
      const century = Math.ceil(presedent.tm.slice(0, 4) / 100);

      presedent = callback(presedent)

      if (devidedData[century]) {
        devidedData[century].push(presedent)
      } else {
        devidedData[century] = [presedent]
      }
    }
    return devidedData
  }

  excludeParty(data, party) {
    return data.filter(({ pp }) => pp.toLowerCase() !== party.toLowerCase())
  }

  replaceWithAcronyms(text) {
    const split = text.replace(/\s+/g, '').split(',')
    let acronyms = ''
    for (let pp of split) {
      if (this.acronyms[pp]) {
        acronyms += `, ${this.acronyms[pp]}`
      }
    }
    return acronyms.substr(2, acronyms.length)
  }

  reverseFirstNames(names) {
    const list = names.split(' ')
    let reverse = ''
    // list.length - 1 because we don't want to reverse last string because it is last name
    for (let i = 0; i < list.length - 1; i++) {

      // if we encounter two letter string we reached last name, reversing over
      if (list[i].length <= 2) {
        return reverse + names.slice(reverse.length, names.length)
      }
      reverse += list[i].split('').reverse().join('') + ' '
    }
    return reverse + names.slice(reverse.length, names.length)
  }
}

export default new PresedentService();