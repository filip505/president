export default {
  generateCsv: jest.fn((request) => 'id'),
  fetchCsv: jest.fn((request) => 'data')
}