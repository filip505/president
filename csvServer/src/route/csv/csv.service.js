import uuid from '../../helper/uuid.generator'
import fs from 'fs'
import { UPLOAD_DIR } from '../../env'
class CsvService {

  headers = {
    nm: 'Name',
    pp: 'Party',
    tm: 'Presidential term',
    president: 'President number',
    timestamp: 'Ingestion Time'
  }

  constructor() {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }
  }

  async generateCsv(data) {
    let parsedData = []
    for (let century in data) {
      parsedData = [...parsedData, ...data[century]]
    }

    const id = uuid()
    var stream = fs.createWriteStream(`upload/${id}.csv`, { flags: 'a' });

    const streamWrite = (row, next) => {
      stream.write(row, function () {
        next()
      });
    }
    
    await this.parseCsvRow(this.headers, streamWrite)
    for (let president of parsedData) {
      await this.parseCsvRow(president, streamWrite)
    }

    return id
  }


  async getCsv(filename) {
    return await this.readFile(`upload/${filename}.csv`)
  }

  parseCsvRow = function (data, callback) {
    return new Promise((resolve, reject) => {
      let row = ''
      for (let key of Object.keys(this.headers)) {
        if (data[key]) {
          row += `"${data[key]}",`
        } else if (key === 'timestamp') {
          row += new Date().valueOf()
        } else {
          row += ','
        }
      }
      row = row.slice(0, -1)
      row += '\n'
      callback(row, () => resolve())
    })
  }

  readFile = function (filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', function (err, data) {
        if (err) reject(err);
        resolve(data)
      });
    })
  }

}

export default new CsvService()




