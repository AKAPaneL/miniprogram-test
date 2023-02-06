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
    // 每当程序初始化的时候, 在 onLaunch 被调用
    // 从本地储存中取回旧数据 token refreshToken, 放到全局中
    this.token = wx.getStorageSync('token');
    this.refreshToken = wx.getStorageSync('refreshToken');
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
