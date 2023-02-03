// pages/notify/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notifyDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({id}) {
    // 默认情况下, onLoad 的参数会获取一个对象, 是上一个页面传入的?查询字符串
    // 这里我们只用到其中的 id 属性, 所以可以解构
    console.log('详情页', id);
    this.getNotifyDetail(id)
  },

  async getNotifyDetail(id) {
    // 发送请求
    const {code, data: notifyDetail} = await wx.http.get(`/announcement/${id}`)
    // 检查报错
    if(code !== 10000) return wx.utils.toast()
    // 赋值data
    this.setData({
      notifyDetail
    })
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
