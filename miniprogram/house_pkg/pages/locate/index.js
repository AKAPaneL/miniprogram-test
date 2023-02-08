// house_pkg/pages/locate/index.ts
import qqmapsdk from '../../../utils/qqmap'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    points: []
  },
  onShow() {
    this.getLocation()
  },
  async getLocation() {
    const { latitude, longitude } = await wx.getLocation()
    this.getPoint(latitude, longitude)
  },
  async chooseLocation() {
    const { latitude, longitude } = await wx.chooseLocation()
    this.getPoint(latitude, longitude)
  },
  // 根据经纬度获取地址，以及周边地区
  getPoint(latitude, longitude) {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: (res) => {
        const { result: { address } } = res
        this.setData({ address })
      }
    })
    qqmapsdk.search({
      keyword: '住宅小区',
      location: {
        latitude,
        longitude
      },
      page_size: 5,
      success: (res) => {
        this.setData({
          points: res.data
        })
      },
      fail: () => {
        wx.utils.toast('没有找附近的小区!')
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
   * 生命周期函数--监听页面显示
   */

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
