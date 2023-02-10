// map.js
Page({
  data: {
    latitude: 40.060539,
    longitude: 116.343847,
    repairDetail: {}
  },
  onLoad({ id }) {
    this.loadRepairDetail(id)
  },
  // 根据id获取对应房屋维修信息
  async loadRepairDetail(id) {
    const { data: repairDetail } = await wx.http.get(`/repair/${id}`)
    this.setData({ repairDetail })
  },
  // 取消保修
  async cancel() {
    const { code } = await wx.http.put(`/cancel/repaire/${this.data.repairDetail.id}`)
    if (code === 10000) {
      wx.util.toast('取消成功')
    }
  }
})
