<script>
export default {
  onLaunch () {
    // 调用API从本地缓存中获取数据
    const userinfo = wx.getStorageSync('userinfo')
    if(userinfo) {
      wx.switchTab({ url: 'pages/index/main' });
    }else {
      wx.navigateTo({ url: 'pages/wxauth/main' });
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
