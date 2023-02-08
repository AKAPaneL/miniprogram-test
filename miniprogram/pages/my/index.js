Page({
  data: {
    userInfo: {}
  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index'
    })
  },
  onLoad() {
  },
  async onShow() {
    const res = await wx.http.get('/userInfo')
    const { avatar, nickName } = res.data
    this.setData({
      'userInfo.avatar': avatar,
      'userInfo.nickName': nickName
    })
  }
})
