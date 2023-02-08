Page({
  onLoad({ id }) {
    console.log(id);
  },
  getHouseDetail(id) {

  },
  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index'
    })
  }
})
