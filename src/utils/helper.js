import storage from './storage'
import { typeOf } from './assist'
import UUID from 'src/utils/uuid'
import sysConfig from 'utils/constant'

export default {
  title (title) {
    title = title || 'vue-sse'
    window.document.title = title
  },
  logout (routerName = 'login') {
    this.clearUserInfo()
    window.router.replace({ name: routerName, query: {} })
  },
  getUserInfo (infoKey = '', defaultValue = '') {
    return storage.getSessionObj('userInfo', infoKey, defaultValue)
  },
  saveUserInfo (infoObj) {
    storage.setSession('userInfo', infoObj)
  },
  updateUserInfo (infoObj) {
    storage.updateSessionObj('userInfo', infoObj)
  },
  clearUserInfo () {
    storage.removeSession('userInfo')
  },
  hasAuth (authKey) {
    if (typeOf(authKey) !== 'string') return false
    let authList = this.getUserInfo('permissions', [])
    return authList.includes(authKey)
  },
  getCommonHeader () {
    let { jsessionId } = this.getUserInfo('', {})
    return {
      reqId: UUID.createUUID(),
      jsessionId: process.env.NODE_ENV === 'development' ? sysConfig.devJsessionId : jsessionId,
      routeName: window.router.app._route.name
    }
  }
}
