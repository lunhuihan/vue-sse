const searchTableBasic = require('./json/search-table-basic.json')
const searchTableFold = require('./json/search-table-fold.json')

module.exports = {
  openApi: [
    {
      baseURL: 'https://test.com',
      paths: {
        '/search-table-basic': {
          get: searchTableBasic
        },
        '/search-table-fold': {
          get: searchTableFold
        }
      }
    }
  ],
  unknown: {}
}
