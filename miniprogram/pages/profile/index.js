// pages/profile/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  async onShow() {
    const res = await wx.http.get('/userInfo')
    const { avatar, nickName } = res.data
    this.setData({
      'userInfo.avatar': avatar,
      'userInfo.nickName': nickName
    })
  },
  async getUserNickName(event) {
    console.log(event);
    const nickName = event.detail.value
    // 失去焦点马上保存到服务器
    const { code } = await wx.http.put('/userInfo', { nickName })

    if (code !== 10000) return wx.utils.toast('更新失败')

    this.setData({
      'userInfo.nickName': nickName
    })
  },
  getUserAvatar(event) {
    console.log(event.detail.avatarUrl)
    // 发起上传请求
    wx.uploadFile({
      filePath: event.detail.avatarUrl,
      name: 'userAvatar',
      url: wx.http.baseURL + '/upload',
      header: {
        Authorization: `Bearer ${getApp().token}`
      },
      success: (res) => {
        // console.log(JSON.parse(res.data).data.url);
        this.setData({
          'userInfo.avatar': JSON.parse(res.data).data.url
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },




  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
