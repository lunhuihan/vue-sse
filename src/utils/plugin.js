import * as filter from './filter'
import debounce from 'directives/debounce'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireHttp = require.context('../apis', false, /\.js$/)

function install (Vue) {
  requireHttp.keys().forEach(fileName => {
    const name = upperFirst(
      camelCase(
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    Vue.prototype[`$${name}`] = requireHttp(fileName).default || requireHttp(fileName)
  })

  Vue.directive('debounce', debounce)
  
  Object.entries(filter).forEach(([key, value]) => {
    Vue.filter(key, value)
  })
}

export default { install }
