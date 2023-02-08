Page({
  data: {
    houseList: [],
    dialogVisible: false
  },

  async onLoad() {
    const res = await wx.http({
      url: '/room'
    })
    this.setData({
      houseList: res.data
    })
  },

  swipeClose(ev) {
    const { position, instance } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true
      })

      // swiper-cell 滑块关闭
      instance.close()
    }
  },

  goDetail(e) {
    wx.navigateTo({
      url: `/house_pkg/pages/detail/index?id=${e.mark.id}`
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index'
    })
  }
})
