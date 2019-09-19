import CryptoJs from 'crypto-js'
import storage from './storage'

let iv = 'keys'
export default {
  MD5 (data) {
    return CryptoJs.MD5(data).toString()
  },
  // 设置加密localStorage
  aesEnLocal (key, value) {
    storage.setLocal(key, CryptoJs.AES.encrypt(value, iv).toString())
  },
  // 得到解密localStorage
  aesDeLocal (key) {
    if (storage.getLocal(key)) {
      return CryptoJs.AES.decrypt(storage.getLocal(key), iv).toString(CryptoJs.enc.Utf8)
    }
    return false
  },
  // 设置加密localStorage对象
  aesEnLocalObj (key, value) {
    storage.setLocal(key, CryptoJs.AES.encrypt(JSON.stringify(value), iv).toString())
  },
  // 得到解密localStorage对象
  aesDeLocalObj (key) {
    if (storage.getLocal(key, []).length) {
      return JSON.parse(CryptoJs.AES.decrypt(storage.getLocal(key), iv).toString(CryptoJs.enc.Utf8))
    }
    return false
  }
}
