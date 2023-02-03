// app.js
// 引入全局工具
import './utils/utils'
// 引入请求http封装
import './utils/http'
App({
  // 小程序启动初始化
  onLaunch() {
    this.getToken()
  },
  getToken() {
    this.token = wx.getStorageSync('token');
  }
})
