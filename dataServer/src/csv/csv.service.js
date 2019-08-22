import axios from "axios";
import { CSV_HOST } from '../env'

class CsvService {

  async generateCsv(data) {
    const res = await axios.post(`${CSV_HOST}/csv`, data)
    return res.data
  }

  async fetchCsv(filename) {
    const res = await axios.get(`${CSV_HOST}/csv/${filename}`)
    return res.data
  }
}

export default new CsvService()