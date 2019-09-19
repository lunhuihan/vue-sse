<template>
  <div>
    <v-nav :logo="logo" system-name="系统名称" :fold="fold" :user-name="userInfo.userName" :headimg="userInfo.headimgurl" @on-fold="toggle" @on-out="logout">
      <breadcrumb></breadcrumb>
    </v-nav>
    <v-sidebar :menu-list="menuList" :active-route-name="activeRouteName" :fold="fold"></v-sidebar>
    <v-content :open="fold">
      <router-view ref="page"></router-view>
    </v-content>
  </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'
import menu from 'utils/menu'
import helper from 'utils/helper'
export default {
  data () {
    return {
      logo: require('../../assets/img/logo.png'),
      fold: false,
      userInfo: {
        userName: '张三',
        headimgurl: require('../../assets/img/headimg.png')
      },
      menuList: []
    }
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    },
    activeRouteName () {
      return menu.getActiveRouteName(this.currentRouteName)
    }
  },
  created () {
    this.menuList = menu.getSidebarMenuList()
  },
  methods: {
    toggle () {
      this.fold = !this.fold
    },
    logout () {
      helper.logout()
    }
  },
  components: {
    breadcrumb
  }
}
</script>