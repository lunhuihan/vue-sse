<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    window.router = this.$router
  }
}
</script>
