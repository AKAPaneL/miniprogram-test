Page({
  data: {
    countDownVisible: false,
    mobile: ''
  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0
    })
  },
  verifyMobile() {
    // 因为获取验证码和登录都需要验证, 可以考虑封装
    const pattern = /^1[3-9][0-9]{9}$/
    const isValid = pattern.test(this.data.mobile)
    // 如果失败, 报错, 返回
    if (!isValid) wx.utils.toast('请输入正确手机号')

    return isValid
  },
  getCode() {
    // 1. 获取用户输入手机号 双向绑定即可
    // 2. 校验
    const isValid = this.verifyMobile()
    // 3. 校验成功, 就发请求得到验证码
    if (isValid) {
      const {code} = wx.http({
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
  }
})
