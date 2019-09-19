<template>
  <Breadcrumb class="breadcrumb-wrap">
    <BreadcrumbItem v-for="(item, index) in breadcrumbList" :key="index" :to="{ name: item.routeName }">{{item.title}}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
import menu from 'utils/menu'

export default {
  data () {
    return {
    }
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    },
    breadcrumbList () {
      return menu.getBreadcrumbList(this.currentRouteName) || []
    }
  },
  created () {},
  methods: {}
}
</script>