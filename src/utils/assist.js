export function trim (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object Symbol]': 'symbol'
  }
  return map[toString.call(obj)]
}
export function deepCopy(data) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }
  if (t === 'array') {
    data.forEach((item) => {
      o.push(deepCopy(item))
    })
  } else if (t === 'object') {
    for (let [key, value] of Object.entries(data)) {
      o[key] = deepCopy(value)
    }
  }
  return o
}

export function getPageQueryObject (fullPath = window.decodeURIComponent(window.location.href)) {
  if (typeOf(fullPath) !== 'string') return {}
  let result = {}
  fullPath.split('?')
    .filter(item => item.includes('='))
    .map(item => item.substring(0, item.includes('#') ? item.indexOf('#') : item.length))
    .join('&')
    .split('&')
    .forEach((item) => {
      let arr = item.split('=')
      if (arr[0]) {
        result[`${arr[0]}`] = arr[1]
      }
    })
  return result
}
