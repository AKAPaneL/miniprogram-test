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
      // const isLogin = !!getApp().token
      // 上面这句代码没有对token进行修改, 只是用token就得到一个 true 没有就得到一个 false
      // 还可以写成
      const token = getApp().token
      const isLogin = Boolean(token)

      this.setData({
        isLogin
      })
      // 如果发现没有登录, 跳转到登录页
      if(!isLogin) {

        const pageStack = getCurrentPages()
        console.log('页面数组', pageStack);
        const currentPage = pageStack[pageStack.length - 1]
        console.log('当前页面', currentPage);
        const url = currentPage.route
        console.log('当前页面地址', url);

        wx.redirectTo({
          url: `/pages/login/index?redirectURL=/${url}`
        })
      }
    }
  }
})
