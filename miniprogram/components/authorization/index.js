// components/authorization/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached() {
      // 取得当前的 token 转换为布尔值赋值给 isLogin
      const isLogin = !!getApp().token
      this.setData({
        isLogin
      })
      // 如果发现没有登录, 跳转到登录页
      if(!isLogin) {
        wx.redirectTo({
          url: '/pages/login/index'
        })
      }
    }
  }
})
