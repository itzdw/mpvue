import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: "点赞图生成器",
    navigationBarBackgroundColor: "#333333",
    navigationBarTextStyle: "white"
  }
}