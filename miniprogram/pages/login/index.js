Page({
  data: {
    countDownVisible: false,
    mobile: '13541232145',
    code: '123456'
  },

  onLoad({redirectURL}) {
    // 因为无需渲染, 只是临时记录数据, 所以可以直接挂在 this 上面
    this.redirectURL = redirectURL
  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0
    })
  },
  // 验证手机号
  verifyMobile() {
    // 因为获取验证码和登录都需要验证, 可以考虑封装
    const pattern = /^1[3-9][0-9]{9}$/
    const isValid = pattern.test(this.data.mobile)
    // 如果失败, 报错, 返回
    if (!isValid) wx.utils.toast('请输入正确手机号')

    return isValid
  },
  // 校验验证码
  verifyCode() {
    const pattern = /^[0-9]{6}$/
    const isValid = pattern.test(this.data.code)
    if(!isValid) wx.utils.toast('请输入正确验证码')

    return isValid
  },
  // 获取验证码
  async getCode() {
    // 1. 获取用户输入手机号 双向绑定即可
    // 2. 校验
    const isValid = this.verifyMobile()
    // 3. 校验成功, 就发请求得到验证码
    if (isValid) {
      const {code} = await wx.http({
        url: `/code?mobile=${this.data.mobile}`
      })
      if(code !== 10000) {
        return wx.utils.toast('发送失败, 请稍后重试')
      }else {
        wx.utils.toast('发送成功, 请查收短信')
        this.setData({
          countDownVisible: true
        })
      }

      
    }
  },
  // 提交表单登录/注册
  async submitForm() {
    // 验证手机号, 验证码
    if(!this.verifyMobile()) return
    if(!this.verifyCode()) return

    // 发送请求
    const {code, data} = await wx.http({
      method: 'post',
      url: '/login',
      data: {
        mobile: this.data.mobile,
        code: this.data.code
      }
    })

    console.log(code, data);
    if(code !== 10000) return wx.utils.toast()

    console.log('目的地', this.redirectURL);
    // 登录成功->跳转页面之间, 要把token记下来
    // 将token记录下来, 然后跳转
    const app = getApp()
    // app.token = data.token
    // // 存起来, 方便下次进入小程序使用
    // wx.setStorageSync('token', data.token);
    // 已经封装了全局函数, 无需在这里写了
    app.setToken(data.token, data.refreshToken)
      

    wx.redirectTo({
      url: this.redirectURL
    })
  }
})
