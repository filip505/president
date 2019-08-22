// const { Parser } = require('json2csv');
import fs from 'fs'
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer'

class CsvService {

  async generateCsv(data) {
    const { Parser } = require('json2csv');

    let fields = [
      { label: 'Name', value: 'nm' }, 
      { label: 'Party', value: 'pp' }, 
      { label: 'Presidential term', value: 'tm' }, 
      { label: 'Presidential number', value: 'president' }, 
    ];

    const parser = new Parser({
      fields
    });
    let newData = []
    for(let century in data){
      newData = [...newData, ...data[century]]
    }
  
    const csv = parser.parse(newData);

    return csv
  }

}

export default new CsvService()




