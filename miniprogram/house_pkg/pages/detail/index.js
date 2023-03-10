Page({
  data: {
    id: '',
    houseDetail: {}
  },
  onLoad({ id }) {
    this.getHouseDetail(id)
    this.setData({
      id: id
    })
  },
  // 根据id获取对应房屋的详情
  async getHouseDetail(id) {
    if (!id) return
    const res = await wx.http.get(`/room/${id}`)
    this.setData({
      houseDetail: res.data
    })
  },
  editHouse() {
    wx.navigateTo({
      url: `/house_pkg/pages/form/index?id=${this.data.id}`
    })
  }
})
