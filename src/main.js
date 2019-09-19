import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import myPlugin from './utils/plugin'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import vueAdminComponents from 'vue-admin-components'
import 'vue-admin-components/dist/styles/vue-admin-components.css'
import './assets/scss/common.scss'

Vue.config.productionTip = false
iView.Message.config({duration: 3})
Vue.use(iView)
Vue.use(vueAdminComponents)
Vue.use(myPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})