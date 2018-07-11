<template>
  <div class="container">
    <div class="img-box">
      <img src="../../../static/logo.png" mode="acceptFit"/>
    </div>
    <div class="text">周助手</div>
    <div class="btn-box">
      <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">微信授权</button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     
    }
  },

  components: {
    
  },

  methods: {
    getUserInfo(event) {
      wx.setStorageSync('userinfo', event.mp.detail.userInfo)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据

  }
}
</script>

<style lang="stylus" scoped>
.container
  display flex
  justify-content center
  align-items center
  flex-direction column
  .img-box
    width 132rpx
    height 132rpx
    border-radius 50%
    overflow hidden
    img 
      width 100%
      height 100%
  .text
    margin-top 10rpx
    font-size 26rpx
    color #333
  .btn-box
    width 100%
    position absolute
    bottom 30rpx
    left 0
    .btn
      width 700rpx
      margin 0 auto 
      height 80rpx
      color #fff
      background #19be6b
      line-height 80rpx
      text-align center
      font-size 30rpx  
      border-radius 10rpx
</style>
