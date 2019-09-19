import { typeOf } from './assist'

const $buildUrl = Symbol('$buildUrl')
const $encode = Symbol('$encode')

class Sse {
  source = null
  options = {}

  constructor(options = {}) {
    this.options = options
  }
  /**
   *  开启链接
   */
  open() {
    if (!this.support()) return

    let {
      url = '', // 所链接的服务器地址
      query = {}, // 所发送的客户端数据
      customEvent = [], // 自定义事件 格式：[{name:'事件名称',callback:function(res){}}]
      withCredentials = false, // 是否发送跨域凭证
      onOpen = () => {}, // 客户端开始链接的事件
      onMessage = () => {}, // 客户端接受到消息的事件（如不自定义系统默认）
      onError = () => {} // 客户端错误事件
    } = this.options

    this.source = new EventSource(this[$buildUrl](url, query), { withCredentials })

    this.source.addEventListener('open', onOpen, false)

    this.source.addEventListener(
      'message',
      event => {
        try {
          let data = JSON.parse(event.data)
          onMessage(data)
        } catch (e) {
          onMessage(event.data)
        }
      },
      false
    )

    this.source.addEventListener(
      'error',
      error => {
        this.source.close()
        onError(error)
      },
      false
    )

    if (typeOf(customEvent) === 'array') {
      customEvent.forEach(({ name = '', callback = () => {} } = {}) => {
        this.source.addEventListener(name, callback, false)
      })
    }
  }
  /**
   * 关闭链接
   */
  close() {
    this.source && this.source.close()
  }
  /**
   *  检查是否支持
   */
  support() {
    return 'EventSource' in window
  }
  /**
   * 构建带请求参数的url
   * @param {String} url 
   * @param {Object} params 
   */
  [$buildUrl](url, params) {
    if (typeOf(url) !== 'string' || typeOf(params) !== 'object') return url
  
    let paris = []
    Object.entries(params).forEach(([key, val]) => {
      if (
        val === null ||
        typeOf(val) === 'undefined' ||
        (typeOf(val) === 'string' && !val.trim().length)
      ) { return }
  
      let values = []
      if (typeOf(val) === 'array') {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
  
      values.forEach(val => {
        if (typeOf(val) === 'date') {
          val = val.toISOString()
        }
  
        if (typeOf(val) === 'object') {
          val = JSON.stringify(val)
        }
  
        paris.push(`${this[$encode](key)}=${this[$encode](val)}`)
      })
    })
  
    let serializedParams = paris.join('&')
    if (serializedParams) {
      url =
        url.indexOf('?') === -1
          ? `${url}?${serializedParams}`
          : `${url}&${serializedParams}`
    }
    return url
  }
  [$encode](val) {
    if (typeOf(val) !== 'string') return val
  
    return encodeURIComponent(val)
      .replace(/%40/g, '@')
      .replace(/%24/g, '$')
      .replace(/%2C/g, ',')
      .replace(/%5B/g, '[')
      .replace(/%5D/g, ']')
      .replace(/%20/g, '+')
      .replace(/%3A/g, ':')
  }
}

export default Sse