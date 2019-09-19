import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/public/layout.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/layout',
      redirect: {
        name: 'home'
      },
      name: 'layout',
      alias: '/',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'home', // 首页
          component: resolve => { require(['../views/public/home.vue'], resolve) }
        },
        {
          path: 'search-table-baisc',
          name: 'search-table-basic', // 首页
          component: resolve => { require(['../views/search-table/basic/index.vue'], resolve) }
        },
        {
          path: 'search-table-fold',
          name: 'search-table-fold', // 首页
          component: resolve => { require(['../views/search-table/fold/index.vue'], resolve) }
        }
      ]
    },
    {
      path: '*',
      name: 'error404',
      component: resolve => { require(['../views/public/error404.vue'], resolve) }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
export default router