Page({

  data: {
    userInfo: {}
  },

  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index'
    })
  },
  async onShow() {
    const {code, data: userInfo} = await wx.http({
      url: '/userInfo'
    })

    if(code !== 10000) return wx.utils.toast()

    this.setData({
      userInfo
    })
  }
})
