Page({
  data: {
    idcardFrontUrl: '/static/images/avatar_1.jpg',
    idcardBackUrl: '/static/images/avatar_2.jpg',
    houseDetail: {}
  },
  onLoad({ id }) {
    this.getHouseDetail(id)
  },
  async getHouseDetail(id) {
    if (!id) return
    const res = await wx.http.get(`/room/${id}`)
    const a = 1
    this.setData({
      houseDetail: res.data,
    })
  },
  goList() {
    wx.reLaunch({
      url: '/house_pkg/pages/list/index'
    })
  },
  log(g) {
    return g.toString()
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  }
})
