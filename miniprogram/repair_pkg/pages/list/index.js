Page({
  data: {
    repairList: []
  },
  onLoad() {
    this.loadRepairList()
  },
  // 获取列表
  async loadRepairList() {
    const { data: { rows } } = await wx.http.get('/repair?current=1&pageSize=20')
    this.setData({
      repairList: rows
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: `/repair_pkg/pages/detail/index?id=${e.mark.id}`
    })
  },
  addRepair() {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index'
    })
  }
})
