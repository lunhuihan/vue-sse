<template>
  <div class="page error404">
    <div class="error404-body-con">
      <Card>
        <div class="error404-body-con-title">4<span>
            <Icon type="ios-navigate-outline"></Icon>
          </span>4</div>
        <p class="error404-body-con-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
        <div class="error404-btn-con">
          <Button @click="goHome" size="large" type="primary" class="btn go-home-btn">返回首页</Button>
          <Button @click="goBack" size="large" type="success" class="btn go-back-btn">返回上一页</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>