Page({
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [
      { name: '北京西三旗花园1号楼 101' },
      { name: '北京东村家园3号楼 302' },
      { name: '北京育新花园3号楼 703' },
      { name: '北京天通苑北苑8号楼 403' },
    ],
    houseSelected: {},
    repairSelected: {},
    appointment: '',
    mobile: '',
    description: '',
    repairItem: [],
    fileList: []
  },
  onLoad() {
    this.loadHouseList()
    this.loadRepairItem()
  },
  // 选择房屋
  onSelectHouse(e) {
    this.setData({
      houseSelected: e.detail
    })
  },
  // 选择维修项目
  onSelectRepair(e) {
    this.setData({
      repairSelected: e.detail
    })
  },
  // 选择时间
  onInput(e) {
    this.setData({
      currentDate: e.detail,
      appointment: new Date(e.detail).toLocaleString()
    });
    this.closeDateLayer()
  },
  // 获取房屋列表
  async loadHouseList() {
    const res = await wx.http.get('/house')
    this.setData({
      houseList: res.data
    })
  },
  // 获取维修项目
  async loadRepairItem() {
    const res = await wx.http.get('/repairItem')
    this.setData({
      repairItem: res.data
    })
  },
  // 选择文件之后的回调 callback
  afterRead(e) {
    const { file } = e.detail;
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: file.url,
      name: 'file',
      header: {
        Authorization: `Bearer ${getApp().token}`,
      },
      success: (res) => {
        const { data } = JSON.parse(res.data)
        const fileArr = this.data.fileList
        fileArr.push(data)
        this.setData({
          fileList: fileArr
        })
      }
    })
  },
  // 删除图片
  deleteFile(e) {
    const fileArr = this.data.fileList.filter(item => item.id !== e.detail.file.id)
    console.log(fileArr);
    this.setData({
      fileList: fileArr
    })
  },
  // 提交表单
  async submit(e) {
    // 表单验证...省略
    //获取数据
    const { houseSelected: { id: houseId }, repairSelected: { id: repairItemId }, appointment, mobile, description, fileList: attachment } = this.data
    const res = await wx.http.post('/repair', {
      houseId,
      repairItemId,
      appointment,
      mobile,
      description,
      attachment
    })
    if (code !== 10000) return wx.showToast({ title: '在线报修失败!', icon: 'none' })
    this.goList()
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index'
    })
  }
})
