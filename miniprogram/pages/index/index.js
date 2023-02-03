
Page({
  async onLoad() {
    const res = await wx.http({
      url: 'https://cnodejs.org/api/v1/topics'
    })
    console.log(res);
  }
})
