const utils = {
  toast(title = '数据加载失败...') {
    wx.showToast({
      title,
      icon: 'none',
      mask: true
    })
  }
}

// 将工具对象挂载 wx 全局对象上
wx.utils = utils

export default utils
