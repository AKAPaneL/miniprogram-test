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
  },
  setToken(token, refreshToken) {
    // 封装一个函数, 在全局当中
    // 存储 token + refreshToken
    // 同时兼顾本地储存备份
    this.token = token
    this.refreshToken = refreshToken
    wx.setStorageSync('token', token);
    wx.setStorageSync('refreshToken', refreshToken);
  }
})
