const utils = {
  toast(title = '数据加载失败...') {
    wx.showToast({
      title,
      icon: 'none',
      mask: true
    })
  }
}

// 将工具对象挂载 wx 全局对象上, 在所有页面都可以用 wx.utils 使用
wx.utils = utils

// 暴露一个变量, 别的地方局部使用可以 import utils from '路径'
export default utils
