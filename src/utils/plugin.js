import * as filter from './filter'
import http from '../apis'
import debounce from 'directives/debounce'

function install (Vue) {
  Vue.directive('debounce', debounce)
  
  Object.entries(filter).forEach(([key, value]) => {
    Vue.filter(key, value)
  })
  Vue.prototype.$Http = http
}

export default { install }
