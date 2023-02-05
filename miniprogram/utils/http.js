import http from 'wechat-http'

// 设定baseURL
http.baseURL = 'https://live-api.itheima.net'

http.intercept.request = config => {
  // 获取 token
  const token = getApp().token

  // 将 token 注入到请求头当中(如果有的话)
  if (token) {
    // 注入之前可能没有header, 需要给个默认值
    config.header = config.header || {}
    config.header.Authorization = `Bearer ${token}`
  }

  // 拦截过就得放行
  return config
}

// 设定响应拦截器
http.intercept.response = res => {
  return res.data
}

// 使用
wx.http = http