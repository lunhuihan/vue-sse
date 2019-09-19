const $type = Symbol('$type')
const $extension = Symbol('$extension')
const download = Symbol('download')
const createElementA = Symbol('createElementA')

export default class DownloadFile {

  [$type] = ''; // 文件mime类型

  [$extension] = ''; // 文件后缀

  constructor(data, name) {
    this.data = data
    this.name = name
  }
  /**
   * 下载文件流
   *
   * @memberof DownloadFile
   */
  [download] () {
    let blob = new Blob([this.data], { type: this[$type] })
    let url = window.URL || window.webkitURL
    let blobUrl = url.createObjectURL(blob)
    this[createElementA](blobUrl)
    url.revokeObjectURL(blobUrl)
  }
  /**
   * 创建下载的a标签
   *
   * @param {*} href
   * @memberof DownloadFile
   */
  [createElementA] (href) {
    let a
    if (window.navigator.userAgent.indexOf('Edge') === -1) {
      a = document.createElement('a')
    } else {
      a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    }
    a.style.display = 'none'
    a.href = href
    a.download = `${this.name}.${this[$extension]}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  /**
   * 下载excel类型文件
   *
   * @memberof DownloadFile
   */
  excel () {
    this[$type] = 'application/vnd.ms-excel;charset=utf-8'
    this[$extension] = 'xls'
    this[download]()
  }
  /**
   * 下载pdf类型文件
   *
   * @memberof DownloadFile
   */
  pdf () { 
    this[$type] = 'application/pdf;charset=utf-8'
    this[$extension] = 'pdf'
    this[download]()
  }
  /**
   * 下载zip类型文件
   *
   * @memberof DownloadFile
   */
  zip () { 
    this[$type] = 'application/gzip;charset=utf-8'
    this[$extension] = 'zip'
    this[download]()
  }
}