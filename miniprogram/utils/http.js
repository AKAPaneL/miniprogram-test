import http from 'wechat-http'

// 设定baseURL
http.baseURL = 'https://live-api.itheima.net'

// 设定拦截器
http.intercept.response = res => {
  return res.data
}

// 使用
wx.http = http