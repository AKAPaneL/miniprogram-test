
Page({
  data: {
    // 储存数据
    notifyList: []
  },

  // 进入页面, 调用获取函数
  async onLoad() {
    this.getNotifyList()
  },

  // 获取列表的函数封装
  async getNotifyList() {
    const {code, data: notifyList} = await wx.http.get('/announcement')
    if(code!==10000) return wx.utils.toast()
    this.setData({
      notifyList
    })
  }
})
