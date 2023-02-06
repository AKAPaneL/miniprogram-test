// pages/profile/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  async getUserNickName(event) {
    console.log(event.detail.value);
    const nickName = event.detail.value
    // 失去焦点马上保存到服务器
    const {code} = await wx.http.put('/userInfo', {nickName})

    if(code !== 10000) return wx.utils.toast('更新失败')

    this.setData({
      'userInfo.nickName': nickName
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
   * 生命周期函数--监听页面显示
   */
  onShow() {

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
