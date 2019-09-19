import Http from './httpBase'

class SearchTable { 
  basic (query, page, pageSize) { 
    let http = new Http()
    http.path = '/search-table-basic'
    http.headers = { page, pageSize }
    http.query = query
    return http.get()
  }
  fold (query, page, pageSize) {
    let http = new Http()
    http.path = '/search-table-fold'
    http.headers = { page, pageSize }
    http.query = query
    return http.get()
  }
}

export default new SearchTable()