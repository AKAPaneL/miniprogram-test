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
    // 这里是通用token但是有可能,某些特定的请求, 需要带不一样的token
    // 我们可以以特意带的 token 为主, 如果你没带, 我再放进去
    config.header.Authorization = config.header.Authorization || `Bearer ${token}`
  }

  // 拦截过就得放行
  return config
}

// 设定响应拦截器
http.intercept.response = async res => {
  // 有可能 token 失效得到401报错
  if (res.statusCode === 401) {
    // 刷新token
    const refreshToken = getApp().refreshToken
    // console.log(refreshToken);
    const {data} = await http({
      url: '/refreshToken',
      method: 'post',
      header: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
    // 得到新的 token 存储起来
    getApp().setToken(data.token, data.refreshToken)
    // 将原来出错的请求, 再来一次, 记得加上 return 阻止之前的错误数据
    return http({
      ...res.config,
      header: {
        Authorization: `Bearer ${data.token}`
      }
    })
  }
  // console.log(res);
  return res.data
}

// 使用
wx.http = http