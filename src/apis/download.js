import Http from './httpBase'
import DownloadFile from 'utils/download'
import { typeOf } from 'utils/assist'

const download = Symbol('download')
const check = Symbol('check')

class Download { 
  /**
   * 公共下载请求
   *
   * @param {Object} { baseURL, path, headers = {}, query = {}, name = '', type }
   * @returns
   * @memberof Download
   */
  [download] ({ baseURL, path, headers = {}, query = {}, name, type }) {
    let http = new Http()
    if (http.baseURL) {
      http.baseURL = baseURL
    }
    http.path = path
    http.headers = headers
    http.query = query
    http.responseType = 'arraybuffer'
    let result = http.get()
    result.then((res) => {
      let downloadFile = new DownloadFile(res.data, name)
      downloadFile[type]()
    })
    return result
  }
  [check] ({ name }) { 
    if (!name || typeOf(name) !== 'string') throw new Error('请设置要下载的文件名')
  }
  /**
   * 下载excel请求
   *
   * @param {Object} { baseURL, path, headers, query, name }
   * @returns
   * @memberof Download
   */
  excel ({ baseURL, path, headers, query, name }) {
    this[check]({ name })
    return this[download]({ baseURL, path, headers, query, name, type: 'excel' })
  }
  pdf ({ baseURL, path, headers, query, name }) {
    this[check]({ name })
    return this[download]({ baseURL, path, headers, query, name, type: 'pdf' })
  }
  zip ({ baseURL, path, headers, query, name }) {
    this[check]({ name })
    return this[download]({ baseURL, path, headers, query, name, type: 'zip' })
  }
}

export default new Download()