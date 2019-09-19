
import helper from 'utils/helper'
import storage from 'utils/storage'

const menuList = [
  {
    title: 'search-table',
    icon: 'ios-apps',
    children: [
      {
        title: '基本用法',
        routeName: 'search-table-basic'
      },
      {
        title: 'fold用法',
        routeName: 'search-table-fold'
      }
    ]
  }
]

const homeMenu = {
  title: '首页',
  routeName: 'home'
}

class Menu {
  menuStorageName = 'menuList'
  /**
   * 获取侧边菜单数据源
   *
   * @returns
   * @memberof Menu
   */
  getSidebarMenuList() {
    if (process.env.NODE_ENV === 'development') {
      return menuList
    } else {
      let sidebarMenuList = storage.getSession(this.menuStorageName, [])
      if (sidebarMenuList.length) {
        return sidebarMenuList
      } else {
        let authMenuList = this.getAuthMenuList(menuList)
        storage.setSession(this.menuStorageName, authMenuList)
        return authMenuList
      }
    }
  }
  getAuthMenuList(list) {
    let permissions = helper.getUserInfo('permissions')
    let result = []
    list.forEach(
      ({
        code = '',
        title = '',
        icon = '',
        routeName = '',
        children = [],
        includedPages = []
      }) => {
        let item = {
          code,
          title,
          icon,
          routeName
        }

        if (children.length) {
          item.children = this.getAuthMenuList(children)
        }
        if (item.children && item.children.length) {
          item.routeName = item.children[0].routeName
        }
        if (includedPages.length) {
          item.includedPages = this.getAuthMenuList(includedPages)
        }
        if (item.includedPages && item.includedPages.length) {
          item.routeName = item.includedPages[0].routeName
        }
        if (!code || permissions.includes(code)) {
          result.push(item)
        }
      }
    )
    return result
  }
  clearSidebarMenuList() {
    storage.removeSession(this.menuStorageName)
  }
  /**
   * 获取当前侧边栏激活routerName
   *
   * @param {String} currentRouteName
   * @memberof Menu
   */
  getActiveRouteName(currentRouteName) {
    if (currentRouteName === homeMenu.routeName) return currentRouteName

    let currentSidebar = this.getCurrentSidebar(currentRouteName)
    
    if (!currentSidebar) return ''

    if (!currentSidebar.children || !currentSidebar.children.length) {
      return currentSidebar.routeName
    } else {
      return currentSidebar.children[0].routeName
    }
  }
  /**
   * 获取面包屑数据
   *
   * @param {String} currentRouteName
   * @memberof Menu
   */
  getBreadcrumbList(currentRouteName) {
    let result = []

    if (homeMenu.routeName === currentRouteName) {
      result.push(homeMenu)
    }
    let currentSidebar = this.getCurrentSidebar(currentRouteName)
    if (currentSidebar) {
      result.push(homeMenu)
      result.push({
        title: currentSidebar.title,
        routeName: currentSidebar.routeName
      })

      if (currentSidebar.children && currentSidebar.children.length) {
        let child = currentSidebar.children[0]
        result.push({
          title: child.title,
          routeName: child.routeName
        })
      }
    }
    return result
  }
  /**
   * 获取当前的菜单栏信息
   *
   * @param {String} currentRouteName
   * @memberof Menu
   */
  getCurrentSidebar(currentRouteName) {
    let menuList = this.getSidebarMenuList()
    return this.getSidebarByRouteName(menuList, currentRouteName)
  }
  getSidebarByRouteName(list, routeName) {
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      if (item.routeName && item.routeName === routeName) {
        return {
          ...item
        }
      }
      if (item.children && item.children.length) {
        let childResult = this.getSidebarByRouteName(item.children, routeName)
        if (childResult) {
          return {
            ...item,
            children: [childResult]
          }
        }
      }
      if (item.includedPages && item.includedPages.length) {
        let includedResult = this.getSidebarByRouteName(
          item.includedPages,
          routeName
        )
        if (includedResult) {
          return { ...item }
        }
      }
    }
  }
}

export default new Menu()
