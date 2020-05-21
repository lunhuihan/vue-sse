<template>
  <div class="page home-page">
    这是首页
  </div>
</template>

<script>
import Sse from 'utils/Sse'
export default {
  data () {
    return {
      name: ''
    }
  },
  async created () {
    let see = new Sse({
      url: 'https://test.com',
      query: {
        min: 4
      },
      onMessage: this.test,
      onError: this.error
    })
    see.open()
  },
  methods: {
    test (data) {
      console.log(this)
      console.log(data)
    },
    error (e) {
      console.log(e)
    }
  },
  components: {
  }
}
</script>